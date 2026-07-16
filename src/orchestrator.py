import os

from src.llm_engine import MuniciPALEngine
from src.retrieval import get_relevant_chunks

# Seting up the engine. Using the API key here to keep things flexible
# so we can easily toggle between real/mock modes.
engine = MuniciPALEngine(api_key=os.getenv("GOOGLE_API_KEY"))


def run_pipeline(user_query):
    # 1. Retrieval: Getting the context chunks first
    # (now backed by the ChromaDB semantic index in src/retrieval.py,
    # which replaced the old keyword scan over manifest.csv)
    chunks = get_relevant_chunks(user_query)

    # 2. Generation: Running it through the engine
    # If we find nothing, let the model handle the "I don't know" gracefully
    if not chunks:
        return "I do not have enough information in the municipal records to answer this."

    response = engine.generate_response(user_query, chunks)
    return response
