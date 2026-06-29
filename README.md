# MuniciPAL-CAP6951-Team13
*AI-Powered Policy and Ordinance Assistant*

## Project Overview
MuniciPAL is a Retrieval-Augmented Generation (RAG) system designed to help city staff navigate complex municipal ordinances and grant policies. By leveraging LLMs and localized vector storage, the system ensures accurate, grounded responses to regulatory queries.


## Getting Started
### Prerequisites
- Python 3.10+
- OpenAI API Key
- ChromaDB

## Project Roadmap
    [x] Data Ingestion: Collection, cleaning, and manifest creation.

    [ ] Vectorization: Implementation of embedding model and ChromaDB index.

    [ ] LLM Generation: System prompt engineering and RAG pipeline integration.

    [ ] Frontend: Streamlit interface development.

## Data Inventory
The system consumes documents from the City of Delray Beach. Please refer to data/raw for the full list of supported ordinances and policy files.

## Data Manifest

| Category | File Name | Year | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Ordinance** | Ordinance_2024_| 2024 | Ready | Selectable text |
| **Ordinance** | Ordinance_2025_| 2025 | Ready | Selectable text |
| **Ordinance** | Ordinance_2026_| 2026 | Ready | Selectable text |
| **Policy** | BF-7_Budget_Transfer.pdf | N/A | Ready | Budget Policy |
| **Policy** | BF-24_Grant_Admin.pdf | N/A | Ready | Core Grant Rules |
| **Policy** | BF-26_Accounts_Rec.pdf | N/A | Ready | Financial Policy |

### Installation
```bash
git clone [https://github.com/your-org/MuniciPAL-CAP6951-Team13.git](https://github.com/your-org/MuniciPAL-CAP6951-Team13.git)
cd MuniciPAL-CAP6951-Team13
pip install -r requirements.txt
```

Created for CAP 6951 - Graduate Project Class
