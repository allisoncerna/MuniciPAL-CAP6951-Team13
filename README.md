# MuniciPAL-CAP6951-Team13
*AI-Powered Policy and Ordinance Assistant | Graduate Capstone Project (CAP 6951)*


## Overview
MuniciPAL is a Retrieval-Augmented Generation (RAG) system built collaboratively for CAP 6951 (Graduate Projects in EE and CS). Designed to help city staff and policy teams efficiently navigate municipal ordinances and grant policies, the system combines semantic vector search with grounded LLM generation to deliver accurate, citation-backed answers.

## Team & Contributions
Developed collaboratively by Team 13 (Allison Cerna, Francesca Dumary, and Matthew Henao):
* **Allison Cerna (Team Leader)**: Led project direction, architected the RAG evaluation framework, developed the LLM integration and prompt grounding logic, and maintained overall technical strategy.
* **Matthew Henao**: Owned the data engineering pipelines, vector search infrastructure, and ChromaDB indexing.
* **Francesca Dumary**: Contributed to full-stack integration, system architecture, and query flow implementation.

## Key Features
* **End-to-End RAG Pipeline**: Automated PDF ingestion, manifest tracking, chunking strategies (512-word chunks with 64-word overlap), and persistent local vector storage via ChromaDB.
* **Semantic Search & Retrieval**: Powered by `sentence-transformers` (`all-MiniLM-L6-v2`) for precise semantic matching across 68 authentic municipal documents from the City of Delray Beach.
* **Grounded LLM Generation**: Integrates Google Gemini (`gemini-flash-latest`) using strict prompt grounding and citation mechanics to eliminate hallucinations.
* **Production-Minded Backend**: Built with a FastAPI backend providing endpoints for document uploads, metadata tracking, and query execution.

## Performance Metrics
* **Retrieval Precision@1**: 90% (evaluated automatically across 20 held-out cross-referencing queries).
* **Hit@5**: 100% (correct source document appears within the top 5 results).
* **Response Grounding**: 100% fully grounded across initial test runs.
* **Execution Speed**: ~8.0 seconds average response time (11.4 seconds maximum).

## Tech Stack
* **Languages & Core**: Python 3.10+, FastAPI (0.139.2), Uvicorn (0.51.0)
* **Data & Search**: ChromaDB (1.5.9), sentence-transformers (`all-MiniLM-L6-v2`), pandas
* **AI Integration**: Google Gemini API (`google-generativeai` 0.8.6), custom RAG grounding prompts
* **Frontend**: Next.js (15.3.4), React (19.1.0)

## Repository Structure
```text
├── src/
│   ├── ingestion.py          # PDF extraction and manifest tracking
│   ├── chunking.py           # Document splitting logic
│   ├── build_index.py        # Embedding generation and ChromaDB indexing
│   ├── retrieval.py          # Semantic search and top-k retrieval logic
│   ├── llm_engine.py         # LLM prompt grounding and generation
│   ├── api.py                # FastAPI endpoints
│   └── evaluate_retrieval.py # Evaluation metrics and testing scripts
├── data/                     # Raw PDFs, manifest, and persistent vector database
├── requirements.txt          # Project dependencies
└── run_pipeline.py           # End-to-end smoke test script
```

## Getting Started
### 1. Clone the Repository
```Bash
git clone https://github.com/allisoncerna/MuniciPAL-CAP6951-Team13.git
cd MuniciPAL-CAP6951-Team13
```
### 2. Set Up the Virtual Environment
```Bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
# source .venv/bin/activate
pip install -r requirements.txt
```
### 3. Security/Configure Environment Variables

This project uses a `.env` file for API key management.
1. Create a `.env` file in the root directory.
2. Add your key: `GOOGLE_API_KEY=your_key_here`


### 4. Build the Index & Run the API
Bash
```python
# Build the vector database index from raw PDFs
python -m src.build_index

# Start the FastAPI backend server
uvicorn src.api:app --reload --port 8000
```

Access the interactive API documentation at http://localhost:8000/docs.

## Data Inventory
The system consumes documents from the City of Delray Beach. Our pipeline processes 68+ ordinances and policies stored in `data/raw/`.

## Data Manifest
The system automatically generates `data/manifest.csv` via `src/ingestion.py`. This manifest acts as the source of truth for the retrieval pipeline.
