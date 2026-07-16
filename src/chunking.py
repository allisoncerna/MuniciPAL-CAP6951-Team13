# ==============================================================================
# CHUNKING: Splitting document text into overlapping chunks for embedding
# By: Matthew Henao (Backend Engineer / Systems Integrator)
# ==============================================================================
#
# Per the proposal (Xu et al. 2023 baseline) we chunk at 512 tokens with a
# 64-token overlap. Tokens are approximated by whitespace words, which keeps
# chunking dependency-free and is close enough for retrieval purposes.

CHUNK_SIZE = 512
CHUNK_OVERLAP = 64


def chunk_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    """Split text into overlapping word-based chunks.

    Returns a list of chunk strings. Empty/whitespace-only text yields [].
    """
    if overlap >= chunk_size:
        raise ValueError("overlap must be smaller than chunk_size")

    words = text.split()
    if not words:
        return []

    chunks = []
    step = chunk_size - overlap
    for start in range(0, len(words), step):
        chunk_words = words[start : start + chunk_size]
        chunks.append(" ".join(chunk_words))
        # Stop once the final chunk reaches the end of the document,
        # otherwise the overlap produces a tiny redundant tail chunk.
        if start + chunk_size >= len(words):
            break
    return chunks
