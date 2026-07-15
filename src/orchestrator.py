import pandas as pd
from src.llm_engine import MuniciPALEngine
import os

# Initializing the engine. Using the API key here to keep us flexible—
# makes it easy to toggle between real and mock modes during testing.
engine = MuniciPALEngine(api_key=os.getenv("GOOGLE_API_KEY"))

def retrieve_relevant_chunks(query, csv_path='data/manifest.csv'):
    """
    Temporary placeholder for the retrieval layer.
    Keyword check against our manifest.csv for now; this *must* be 
    swapped out for the ChromaDB index once Matthew finishes it.
    """
    df = pd.read_csv(csv_path)
    # Basic filtering to grab potentially relevant content for the query
    results = df[df['text'].str.contains(query, case=False, na=False)]
    
    # Returning top 3 matches to feed the engine
    return results['text'].head(3).tolist()

def run_pipeline(user_query):
    # Breaking the query into keywords to improve our retrieval rate.
    # Ignoring short words to reduce noise in the search results.
    keywords = [word for word in user_query.split() if len(word) > 3]
    
    # Searching for any match in our manifest.
    df = pd.read_csv('data/manifest.csv')
    
    # Filtering rows that contain at least one of our keywords.
    mask = df['text'].apply(lambda x: any(k.lower() in str(x).lower() for k in keywords))
    results = df[mask]
    
    # Limiting to top 3 chunks to stay within LLM context limits.
    chunks = results['text'].head(3).tolist()
    
    # Graceful exit if our data lacks the info requested.
    if not chunks:
        return "I do not have enough information."
    
    # Final pass through the engine to get a grounded response.
    return engine.generate_response(user_query, chunks)