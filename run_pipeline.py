# ==============================================================================
# PIPELINE TESTER: Verifying end-to-end flow (Ingestion -> Retrieval -> LLM)
# By: Allison Cerna (Team 13 Lead)
# ==============================================================================

import os
from dotenv import load_dotenv
from src.llm_engine import MuniciPALEngine
from src.retrieval import get_relevant_chunks

# loading our env variables so we can grab that api key safely
# using override=true to force-load the latest .env file
load_dotenv(override=True)

# pulling the GOOGLE_API_KEY from our .env file 
# keeping this separate from the code so it stays out of github
my_api_key = os.getenv("GOOGLE_API_KEY")

# initializing the engine
# if the key is missing it'll automatically switch to 'mock mode' 
# so we can keep testing the pipeline without an active connection
engine = MuniciPALEngine(api_key=my_api_key)

# running the full pipeline test to make sure everything is wired up
user_query = "When is the grant deadline?"

# first pull the relevant text chunks using our skeleton retriever
# this is where matt's future chromadb logic will eventually plug in
relevant_chunks = get_relevant_chunks(user_query)

# then send those chunks plus the user's question to the engine for an answer
# this should now connect properly using the gemini-2.0-flash model
response = engine.generate_response(user_query, relevant_chunks)

print(f"query: {user_query}")
print(f"engine response: {response}"
