# ==============================================================================
# RAG RETRIEVAL: Placeholder Retrieval Logic
# By: Allison Cerna (Team 13 Lead)
# ==============================================================================

import pandas as pd

def get_relevant_chunks(query, manifest_path='data/manifest.csv'):
    # this is our skeleton retrieval logic
    # just returning dummy chunks for now so we can test the 
    # full pipeline end-to-end, matt can replace this with 
    # the actual chromadb search logic once he's ready
    
    print(f"retrieving relevant chunks for query: '{query}'...")
    
    # placeholder returning a hardcoded list of text chunks
    # this ensures the pipeline is wired up and working while we wait 
    # for the real vector database integration
    return [
        "Ordinance 2026-01: All grant applications must be submitted by June 1st.",
        "Policy BF-7: Budget transfers require approval from the City Manager."
    ]
