import pandas as pd
from src.llm_engine import MuniciPALEngine
import os

# Seting up the engine. Using the API key here to keep things flexible
# so we can easily toggle between real/mock modes.
engine = MuniciPALEngine(api_key=os.getenv("GOOGLE_API_KEY"))

def retrieve_relevant_chunks(query, csv_path='data/manifest.csv'):
    """
    Temporary retriever to keep us moving. 
    Just does a basic keyword check against our manifest.csv for now.
    Need to replace this with the ChromaDB index once it's ready.
    """
    df = pd.read_csv(csv_path)
    # Simple filtering to grab anything relevant to the user's question
    results = df[df['text'].str.contains(query, case=False, na=False)]
    
    # Returning the top 3 results to feed into the engine
    return results['text'].head(3).tolist()

def run_pipeline(user_query):
    # 1. Retrieval: Getting the context chunks first
    chunks = retrieve_relevant_chunks(user_query)
    
    # 2. Generation: Running it through the engine
    # If we find nothing, let the model handle the "I don't know" gracefully
    if not chunks:
        return "I do not have enough information in the municipal records to answer this."
        
    response = engine.generate_response(user_query, chunks)
    return response