# ==============================================================================
# INDEX BUILDER: manifest.csv -> chunks -> embeddings -> ChromaDB
# By: Matthew Henao (Backend Engineer / Systems Integrator)
# ==============================================================================
#
# Run from the repo root:
#   python -m src.build_index
#
# Reads data/manifest.csv (generating it via src/ingestion.py if missing),
# splits every document into overlapping chunks, and upserts them into the
# persistent ChromaDB collection used by src/retrieval.py.

import os
import sys
from pathlib import Path

import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.chunking import chunk_text
from src.vector_store import get_collection, add_document_chunks

MANIFEST_PATH = PROJECT_ROOT / "data" / "manifest.csv"


def build_index(manifest_path=MANIFEST_PATH):
    if not os.path.exists(manifest_path):
        print("No manifest found - running ingestion first...")
        from src.ingestion import process_pdfs_to_manifest
        process_pdfs_to_manifest(
            root_folder=str(PROJECT_ROOT / "data" / "raw"),
            output_csv=str(manifest_path),
        )

    df = pd.read_csv(manifest_path)
    collection = get_collection()

    total_chunks = 0
    skipped = []
    for _, row in df.iterrows():
        text = row["text"] if isinstance(row["text"], str) else ""
        chunks = chunk_text(text)
        if not chunks:
            # Scanned/image-only PDFs extract no text; flag them for the team.
            skipped.append(row["filename"])
            continue
        extra = {}
        for key in ("category", "year"):
            # Values come back from the CSV as strings, ints (year), or NaN,
            # so normalize everything to non-empty strings.
            value = row.get(key)
            if pd.notna(value) and str(value).strip():
                extra[key] = str(value).split(".")[0] if key == "year" else str(value)
        count = add_document_chunks(collection, row["filename"], chunks, extra)
        total_chunks += count
        print(f"Indexed {row['filename']}: {count} chunks")

    print(f"\nDone! Indexed {total_chunks} chunks from {len(df) - len(skipped)} documents.")
    if skipped:
        print(f"Skipped {len(skipped)} documents with no extractable text:")
        for name in skipped:
            print(f"  - {name}")


if __name__ == "__main__":
    build_index()
