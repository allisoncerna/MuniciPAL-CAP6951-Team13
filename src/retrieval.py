# ==============================================================================
# RAG RETRIEVAL: Placeholder Retrieval Logic
# By: Allison Cerna (Team 13 Lead)
# ==============================================================================

import pandas as pd

def get_relevant_chunks(query, manifest_path='data/manifest.csv'):
    # This is our skeleton retrieval logic. 
    # For now, it just returns a list of dummy chunks so we can test the 
    # full pipeline end-to-end. Matthew can replace this later with 
    # actual ChromaDB search logic once he's ready.
    
    print(f"Retrieving relevant chunks for query: '{query}'...")
    
    # Placeholder: Returning a hardcoded list of text chunks. 
    # This ensures the pipeline is wired up and working while we wait 
    # for the real vector database integration.
    return [
        "Ordinance 2026-01: All grant applications must be submitted by June 1st.",
        "Policy BF-7: Budget transfers require approval from the City Manager."
    ]
