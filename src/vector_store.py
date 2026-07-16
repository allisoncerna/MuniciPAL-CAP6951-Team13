# ==============================================================================
# VECTOR STORE: ChromaDB wrapper for the MuniciPAL retrieval index
# By: Matthew Henao (Backend Engineer / Systems Integrator)
# ==============================================================================
#
# We use a persistent ChromaDB collection stored under data/chroma_db/.
# Embeddings use ChromaDB's default embedding function, which is the
# all-MiniLM-L6-v2 sentence-transformers model (served via ONNX runtime) —
# the exact model named in the proposal, without needing a PyTorch install.

import os
from pathlib import Path

import chromadb

PROJECT_ROOT = Path(__file__).resolve().parents[1]
CHROMA_DIR = os.environ.get("MUNICIPAL_CHROMA_DIR", str(PROJECT_ROOT / "data" / "chroma_db"))
COLLECTION_NAME = "municipal_docs"

_client = None


def get_client():
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(path=CHROMA_DIR)
    return _client


def get_collection():
    # cosine distance works best with normalized sentence-transformer embeddings
    return get_client().get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},
    )


def add_document_chunks(collection, filename, chunks, extra_metadata=None):
    """Index a document's chunks with stable, per-chunk IDs.

    Re-indexing the same filename overwrites the previous chunks (upsert),
    so the index never accumulates duplicates.
    """
    if not chunks:
        return 0
    metadata = {"filename": filename}
    if extra_metadata:
        metadata.update(extra_metadata)
    collection.upsert(
        ids=[f"{filename}::chunk{i}" for i in range(len(chunks))],
        documents=chunks,
        metadatas=[{**metadata, "chunk_index": i} for i in range(len(chunks))],
    )
    return len(chunks)


def delete_document(collection, filename):
    """Remove every chunk belonging to a document from the index."""
    collection.delete(where={"filename": filename})


def list_documents(collection):
    """Return [{filename, chunk_count, ...metadata}] for all indexed documents."""
    results = collection.get(include=["metadatas"])
    docs = {}
    for meta in results["metadatas"]:
        name = meta.get("filename", "unknown")
        if name not in docs:
            docs[name] = {k: v for k, v in meta.items() if k != "chunk_index"}
            docs[name]["chunk_count"] = 0
        docs[name]["chunk_count"] += 1
    return sorted(docs.values(), key=lambda d: d["filename"])
