# DATA INGESTION: AUTOMATED MANIFEST GENERATOR
# By: Allison Cerna
# ==============================================================================

import os
import pandas as pd

# I'm setting this up so we don't have to manually update a CSV every time we 
# add a new PDF. The pipeline just needs to run this and it's good to go.
def generate_manifest(root_dir='data/raw', output_file='data/manifest.csv'):
    
    # We'll store our file records here as we scan the folders
    manifest_data = []
    
    # Walking through the directory to find everything. 
    # The folder name acts as our category (Ordinance vs Policy).
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.lower().endswith(".pdf"):
                path = os.path.join(root, file)
                category = os.path.basename(root)
                manifest_data.append({
                    'Category': category,
                    'File Name': file,
                    'Path': path,
                    'Status': 'Ready'
                })
    
    # Saving this as the "Source of Truth" for the RAG pipeline.
    df = pd.DataFrame(manifest_data)
    df.to_csv(output_file, index=False)
    print(f"Manifest updated: {len(df)} files tracked at {output_file}")

if __name__ == "__main__":
    generate_manifest()

    import openai
