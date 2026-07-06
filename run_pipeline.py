# ==============================================================================
# PIPELINE TESTER: Verifying end-to-end flow (Ingestion -> Retrieval -> LLM)
# By: Allison Cerna (Team 13 Lead)
# ==============================================================================

import os
from dotenv import load_dotenv
from src.llm_engine import MuniciPALEngine
from src.retrieval import get_relevant_chunks

# 1. Loading up our environment variables so we can grab that API key safely.
# I'm using override=True to make sure we force-load the latest .env file.
load_dotenv(override=True)

# 2. Pulling the GOOGLE_API_KEY from our .env file. 
# Keeping this separate from the code so it stays out of GitHub.
my_api_key = os.getenv("GOOGLE_API_KEY")

# 3. Initializing the engine. 
# If the key is missing, it'll automatically switch to 'Mock Mode' 
# so we can keep testing the pipeline without needing an active connection.
engine = MuniciPALEngine(api_key=my_api_key)

# 4. Running the full pipeline test to make sure everything is wired up.
user_query = "When is the grant deadline?"

# First, pull the relevant text chunks (using our skeleton retriever).
# This is where Matthew's future ChromaDB logic will eventually plug in.
relevant_chunks = get_relevant_chunks(user_query)

# Then, send those chunks + the user's question to the engine for an answer.
# This should now connect properly using the gemini-2.0-flash model.
response = engine.generate_response(user_query, relevant_chunks)

print(f"Query: {user_query}")
print(f"Engine Response: {response}")