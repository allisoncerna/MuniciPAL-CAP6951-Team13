# ==============================================================================
# INGESTION: Extracting text from our nested PDF structure
# By: Allison Cerna (Team 13 Lead)
# ==============================================================================

import pdfplumber
import pandas as pd
import os

def extract_text_from_pdf(pdf_path):
    # Grabbing the text from every page of the PDF.
    # Since these are text-selectable, this should be super clean.
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Bummer, couldn't read {pdf_path}: {e}")
    return text

def process_pdfs_to_manifest(root_folder='data/raw', output_csv='data/manifest.csv'):
    all_data = []
    
    # Using os.walk to go through all subfolders (like the year folders in ordinances).
    # This ensures we hit every single PDF regardless of how deep it's buried.
    for root, dirs, files in os.walk(root_folder):
        for filename in files:
            if filename.endswith(".pdf"):
                path = os.path.join(root, filename)
                print(f"Processing: {filename}...")
                content = extract_text_from_pdf(path)

                # Capturing where the file lives so the retrieval index can
                # carry source metadata (category folder + year subfolder).
                rel_parts = os.path.relpath(path, root_folder).split(os.sep)
                category = rel_parts[0] if len(rel_parts) > 1 else ""
                year = rel_parts[1] if len(rel_parts) > 2 else ""

                # Adding it to our list so we can turn it into a CSV later.
                all_data.append({
                    "filename": filename,
                    "category": category,
                    "year": year,
                    "text": content,
                })
    
    # Saving everything into a CSV so the rest of our pipeline can access it.
    df = pd.DataFrame(all_data)
    df.to_csv(output_csv, index=False)
    print(f"Done! Processed {len(all_data)} PDFs into {output_csv}.")

if __name__ == "__main__":
    # Pointing it at the raw data folder to start the ingestion.
    process_pdfs_to_manifest()
