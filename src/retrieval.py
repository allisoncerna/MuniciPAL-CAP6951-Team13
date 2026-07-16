# ==============================================================================
# RAG RETRIEVAL: ChromaDB semantic search over the municipal document index
# By: Matthew Henao (Backend Engineer / Systems Integrator)
# (replaces the placeholder retriever from the pipeline skeleton)
# ==============================================================================
#
# Build the index first with:  python -m src.build_index

from src.vector_store import get_collection

DEFAULT_TOP_K = 5


def retrieve(query, top_k=DEFAULT_TOP_K):
    """Semantic search over the index.

    Returns a list of dicts: {text, filename, chunk_index, score, ...metadata},
    ordered most-relevant first. Score is cosine similarity (higher = better).
    """
    collection = get_collection()
    if collection.count() == 0:
        raise RuntimeError(
            "The retrieval index is empty. Run `python -m src.build_index` first."
        )

    results = collection.query(
        query_texts=[query],
        n_results=min(top_k, collection.count()),
        include=["documents", "metadatas", "distances"],
    )

    hits = []
    for text, meta, distance in zip(
        results["documents"][0], results["metadatas"][0], results["distances"][0]
    ):
        hits.append({
            "text": text,
            "score": round(1.0 - distance, 4),  # cosine distance -> similarity
            **meta,
        })
    return hits


def get_relevant_chunks(query, top_k=DEFAULT_TOP_K):
    """Backwards-compatible entry point used by run_pipeline.py / llm_engine.

    Returns plain strings, each prefixed with its source document so the
    LLM can cite where the information came from.
    """
    print(f"Retrieving relevant chunks for query: '{query}'...")
    return [
        f"[Source: {hit['filename']}] {hit['text']}"
        for hit in retrieve(query, top_k=top_k)
    ]
