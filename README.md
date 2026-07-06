# MuniciPAL-CAP6951-Team13
*AI-Powered Policy and Ordinance Assistant*

## Project Overview
MuniciPAL is a Retrieval-Augmented Generation (RAG) system designed to help city staff navigate complex municipal ordinances and grant policies. By leveraging Google Gemini and local text extraction, the system provides accurate, grounded responses to regulatory queries.

## Getting Started
### Prerequisites
- Python 3.10+
- Google AI Studio API Key
- `pdfplumber`, `pandas`, `python-dotenv`

### Security
This project uses a `.env` file for API key management. 
1. Create a `.env` file in the root directory.
2. Add your key: `GOOGLE_API_KEY=your_key_here`
3. **Important:** Ensure `.env` is listed in your `.gitignore` to keep it private.

## Project Roadmap
    [x] Data Ingestion: Automated PDF text extraction from nested directory structures.
    [x] LLM Generation: Secure integration with Google Gemini 2.0 Flash.
    [ ] Vectorization: Final integration with ChromaDB (In progress).
    [ ] Frontend: Streamlit interface integration (In progress).

## Data Inventory
The system consumes documents from the City of Delray Beach. Our pipeline processes 68+ ordinances and policies stored in `data/raw/`.

## Data Manifest
The system automatically generates `data/manifest.csv` via `src/ingestion.py`. This manifest acts as the source of truth for the retrieval pipeline.

### Installation
```bash
git clone [https://github.com/your-org/MuniciPAL-CAP6951-Team13.git](https://github.com/your-org/MuniciPAL-CAP6951-Team13.git)
cd MuniciPAL-CAP6951-Team13
pip install -r requirements.txt
python src/ingestion.py
