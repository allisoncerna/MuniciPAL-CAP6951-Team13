# ==============================================================================
# API LAYER: FastAPI backend exposing the RAG pipeline to the frontend
# By: Matthew Henao (Backend Engineer / Systems Integrator)
# ==============================================================================
#
# Run from the repo root:
#   uvicorn src.api:app --reload --port 8000
#
# Endpoints:
#   GET    /health                     - index stats / liveness
#   POST   /api/query                  - ask a question, get grounded answer + sources
#   POST   /api/generate               - wizard payload -> drafted document
#   GET    /api/documents              - list indexed documents
#   POST   /api/documents/upload       - upload a PDF, extract, chunk, index it
#   DELETE /api/documents/{filename}   - remove a document from the index

import os
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from src.chunking import chunk_text
from src.ingestion import extract_text_from_pdf
from src.llm_engine import MuniciPALEngine
from src.retrieval import retrieve
from src.vector_store import add_document_chunks, delete_document, get_collection, list_documents

load_dotenv(override=True)

PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = PROJECT_ROOT / "data" / "raw"
UPLOAD_DIR = RAW_DIR / "uploads"


def find_source_file(filename):
    """Locate a document's PDF under data/raw by its base filename."""
    target = Path(filename).name
    for path in RAW_DIR.rglob("*.pdf"):
        if path.name == target:
            return path
    return None

app = FastAPI(title="MuniciPAL API", version="0.1.0")

# The Next.js dev server runs on :3000; Streamlit demos default to :8501.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8501"],
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = MuniciPALEngine(api_key=os.getenv("GOOGLE_API_KEY"))


class QueryRequest(BaseModel):
    query: str = Field(min_length=1)
    top_k: int = Field(default=5, ge=1, le=20)


class ChunkHit(BaseModel):
    text: str
    filename: str
    chunk_index: int
    score: float
    category: Optional[str] = None
    year: Optional[str] = None


class QueryResponse(BaseModel):
    answer: str
    chunks: List[ChunkHit]
    mock_mode: bool


class GenerateRequest(BaseModel):
    document_type: str
    department_name: str = ""
    program_name: str = ""
    department_type: str = ""
    audience: List[str] = []
    additional_instructions: str = ""
    top_k: int = Field(default=8, ge=1, le=20)


@app.get("/health")
def health():
    collection = get_collection()
    return {
        "status": "ok",
        "indexed_chunks": collection.count(),
        "documents": len(list_documents(collection)),
        "llm_mode": "mock" if engine.model is None else "gemini",
    }


@app.post("/api/query", response_model=QueryResponse)
def query(req: QueryRequest):
    try:
        hits = retrieve(req.query, top_k=req.top_k)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))

    context = [f"[Source: {h['filename']}] {h['text']}" for h in hits]
    answer = engine.generate_response(req.query, context)
    return QueryResponse(
        answer=answer,
        chunks=[ChunkHit(**h) for h in hits],
        mock_mode=engine.model is None,
    )


@app.post("/api/generate")
def generate(req: GenerateRequest):
    # Build a retrieval query out of the wizard answers so the draft is
    # grounded in the documents most relevant to the request.
    search_query = " ".join(
        part for part in [
            req.document_type,
            req.department_name,
            req.department_type,
            req.program_name,
            req.additional_instructions,
        ] if part
    )
    try:
        hits = retrieve(search_query, top_k=req.top_k)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))

    context = [f"[Source: {h['filename']}] {h['text']}" for h in hits]
    draft = engine.generate_document(req.model_dump(), context)
    return {
        "draft": draft,
        "sources": sorted({h["filename"] for h in hits}),
        "mock_mode": engine.model is None,
    }


@app.get("/api/documents")
def documents():
    # Merge index metadata with file stats so the frontend repository page
    # can show size/date and link to the PDF without touching the filesystem.
    docs = list_documents(get_collection())
    for doc in docs:
        source = find_source_file(doc["filename"])
        if source:
            stat = source.stat()
            doc["size_bytes"] = stat.st_size
            doc["modified"] = datetime.fromtimestamp(
                stat.st_mtime, tz=timezone.utc
            ).isoformat()
            doc["rel_path"] = source.relative_to(RAW_DIR).as_posix()
    return docs


@app.get("/api/documents/{filename}/file")
def document_file(filename: str, download: bool = False):
    source = find_source_file(filename)
    if source is None:
        raise HTTPException(status_code=404, detail=f"'{filename}' not found in data/raw.")
    return FileResponse(
        source,
        media_type="application/pdf",
        filename=source.name,
        content_disposition_type="attachment" if download else "inline",
    )


@app.post("/api/documents/upload")
def upload_document(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF uploads are supported.")

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    # Keep just the base name so a crafted filename can't escape the upload dir.
    safe_name = Path(file.filename).name
    dest = UPLOAD_DIR / safe_name
    with dest.open("wb") as out:
        shutil.copyfileobj(file.file, out)

    text = extract_text_from_pdf(str(dest))
    chunks = chunk_text(text)
    if not chunks:
        dest.unlink(missing_ok=True)
        raise HTTPException(
            status_code=422,
            detail="No extractable text found in the PDF (is it a scanned image?).",
        )

    count = add_document_chunks(
        get_collection(), safe_name, chunks, {"category": "uploads"}
    )
    return {"filename": safe_name, "indexed_chunks": count}


@app.delete("/api/documents/{filename}")
def remove_document(filename: str):
    collection = get_collection()
    before = collection.count()
    delete_document(collection, filename)
    removed = before - collection.count()
    if removed == 0:
        raise HTTPException(status_code=404, detail=f"'{filename}' is not in the index.")
    # Also remove the stored file if it came in through the upload endpoint.
    (UPLOAD_DIR / Path(filename).name).unlink(missing_ok=True)
    return {"filename": filename, "removed_chunks": removed}
