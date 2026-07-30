# GENERATION EVALUATION: grounding + speed on a small sample, one API call each
# ==============================================================================
#
#
# Deliberately minimal on API usage: exactly one generate_content call per
# sampled query (default 5, first N cases from data/eval_queries.json).
# Prints the answer next to its source chunks so grounding can be judged by
# eye (filenames the answer should be citing), plus wall-clock latency.

import json
import os
import sys
import time
from pathlib import Path

from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.llm_engine import MuniciPALEngine
from src.retrieval import retrieve

EVAL_PATH = PROJECT_ROOT / "data" / "eval_queries.json"
SAMPLE_SIZE = 5
TOP_K = 5


def evaluate(eval_path=EVAL_PATH, sample_size=SAMPLE_SIZE, top_k=TOP_K):
    load_dotenv(override=True)
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError("GOOGLE_API_KEY not set - can't run live generation eval.")

    engine = MuniciPALEngine(api_key=api_key)

    with open(eval_path, encoding="utf-8") as f:
        cases = json.load(f)[:sample_size]

    durations = []
    for case in cases:
        query = case["query"]
        expected = case["expected_files"]

        hits = retrieve(query, top_k=top_k)
        chunks = [f"[Source: {h['filename']}] {h['text']}" for h in hits]

        start = time.perf_counter()
        answer = engine.generate_response(query, chunks)
        elapsed = time.perf_counter() - start
        durations.append(elapsed)

        print(f"\nQ: {query}")
        print(f"expected source(s): {expected}")
        print(f"retrieved source(s): {[h['filename'] for h in hits]}")
        print(f"latency: {elapsed:.2f}s")
        print(f"answer: {answer}")

    print(f"\n--- {len(cases)} queries, one generate_content call each ---")
    print(f"avg latency: {sum(durations) / len(durations):.2f}s")
    print(f"max latency: {max(durations):.2f}s")
    print(
        "Grounding must be judged by eye above: does each answer's content "
        "match only the retrieved source chunks, with no invented facts?"
    )

    return durations


if __name__ == "__main__":
    evaluate()
