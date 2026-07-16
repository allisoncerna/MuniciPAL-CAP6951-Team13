# ==============================================================================
# RETRIEVAL EVALUATION: measuring precision against Objective 1's >=80% target
# By: Matthew Henao (Backend Engineer / Systems Integrator)
# ==============================================================================
#
# Run from the repo root (after building the index):
#   python -m src.evaluate_retrieval
#
# Test queries live in data/eval_queries.json as a list of
#   {"query": "...", "expected_files": ["Ordinance No. 05-25.pdf", ...]}
# where expected_files are the source documents a correct retrieval should
# surface. Add cases there as the team writes more held-out queries.
#
# Reported metrics:
#   precision@1 - top result comes from an expected document
#   hit@k       - any of the top-k results comes from an expected document
#   MRR         - mean reciprocal rank of the first relevant result

import json
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.retrieval import retrieve

EVAL_PATH = PROJECT_ROOT / "data" / "eval_queries.json"
TOP_K = 5


def evaluate(eval_path=EVAL_PATH, top_k=TOP_K):
    with open(eval_path, encoding="utf-8") as f:
        cases = json.load(f)

    p_at_1 = hits = rr_total = 0
    failures = []

    for case in cases:
        results = retrieve(case["query"], top_k=top_k)
        expected = set(case["expected_files"])
        ranked_files = [r["filename"] for r in results]

        if ranked_files and ranked_files[0] in expected:
            p_at_1 += 1
        first_rank = next(
            (i + 1 for i, name in enumerate(ranked_files) if name in expected), None
        )
        if first_rank:
            hits += 1
            rr_total += 1.0 / first_rank
        else:
            failures.append((case["query"], expected, ranked_files))

    n = len(cases)
    print(f"Evaluated {n} queries (top_k={top_k})")
    print(f"  precision@1 : {p_at_1 / n:.0%}")
    print(f"  hit@{top_k}       : {hits / n:.0%}")
    print(f"  MRR         : {rr_total / n:.2f}")

    if failures:
        print("\nMisses:")
        for query, expected, got in failures:
            print(f"  Q: {query}")
            print(f"     expected {sorted(expected)}, got {got}")

    return p_at_1 / n, hits / n


if __name__ == "__main__":
    evaluate()
