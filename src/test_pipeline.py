# test_pipeline.py
from src.orchestrator import run_pipeline

# Choosing a query that we know should be in our PDF documents
query = "What is the policy regarding municipal grant deadlines?"

print(f"Testing pipeline with query: '{query}'...")

# This calls your orchestrator, which triggers retrieval and generation
response = run_pipeline(query)

print("-" * 30)
print(f"Assistant Response:\n{response}")
print("-" * 30)