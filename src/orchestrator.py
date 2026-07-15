import pandas as pd
from src.llm_engine import MuniciPALEngine
import os

# getting the engine ready and using the api key so we can switch between real/mock modes easily
engine = MuniciPALEngine(api_key=os.getenv("GOOGLE_API_KEY"))

def retrieve_relevant_chunks(query, csv_path='data/manifest.csv'):
    """
    quick and dirty retrieval for now 
    just doing a keyword check on the manifest, gotta swap this 
    for the chromaDB index once matt gets that part done
    """
    df = pd.read_csv(csv_path)
    # just grabbing anything that looks relevant
    results = df[df['text'].str.contains(query, case=False, na=False)]
    
    # sending the top 3 matches to the engine
    return results['text'].head(3).tolist()

def run_pipeline(user_query):
    # splitting the query into keywords to catch more results
    # ignoring short words so we don't get too much noise
    keywords = [word for word in user_query.split() if len(word) > 3]
    
    # hunting for any matches in our manifest
    df = pd.read_csv('data/manifest.csv')
    
    # keeping rows that have at least one of our keywords
    mask = df['text'].apply(lambda x: any(k.lower() in str(x).lower() for k in keywords))
    results = df[mask]
    
    # keeping it to top 3 so we don't blow up the context window
    chunks = results['text'].head(3).tolist()
    
    # letting the user know if we're totally stumped
    if not chunks:
        return "I do not have enough information"
    
    # sending it to the engine to get a grounded answer
    return engine.generate_response(user_query, chunks)