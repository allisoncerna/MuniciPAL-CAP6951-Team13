import os
from dotenv import load_dotenv
from src.llm_engine import MuniciPALEngine

# 1. Loading up our environment variables so we can grab that API key safely.
load_dotenv()

# 2. Pulling the GOOGLE_API_KEY from our .env file. 
# Keeping this separate from the code so it stays out of GitHub.
my_api_key = os.getenv("GOOGLE_API_KEY")

# 3. Initializing the engine. 
# If the key is missing, it'll automatically switch to 'Mock Mode' 
# so we can keep testing the pipeline without needing an active connection.
engine = MuniciPALEngine(api_key=my_api_key)

# 4. Running a quick test to make sure everything is wired up correctly.
mock_chunks = [
    "Ordinance 2026-01: All grant applications must be submitted by June 1st.",
    "Policy BF-7: Budget transfers require approval from the City Manager."
]
user_query = "When is the grant deadline?"

# Getting the response from the engine—this should now hit Gemini (or show [MOCK MODE] if no key).
response = engine.generate_response(user_query, mock_chunks)
print(f"Engine Response: {response}")