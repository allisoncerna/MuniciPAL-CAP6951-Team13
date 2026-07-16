import { NextResponse } from "next/server";
import type { RepositoryDocument } from "@/lib/repository-data";

export const dynamic = "force-dynamic";

// FastAPI backend (src/api.py). Override with MUNICIPAL_API_URL in .env.local.
const BACKEND_URL = process.env.MUNICIPAL_API_URL ?? "http://localhost:8000";

type BackendDocument = {
  filename: string;
  chunk_count: number;
  category?: string;
  year?: string;
  size_bytes?: number;
  modified?: string;
  rel_path?: string;
};

function formatFileSize(bytes?: number) {
  if (bytes === undefined) {
    return "—";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function toDocument(record: BackendDocument): RepositoryDocument {
  const { filename, category, year } = record;
  const documentName = filename.replace(/\.pdf$/i, "");

  const type = category === "grant_policies" ? "Policy" : category === "uploads" ? "Uploaded" : "Ordinance";
  const department =
    category === "grant_policies" ? "Grant Policies" : category === "uploads" ? "Uploads" : `Ordinances${year ? ` ${year}` : ""}`;
  const status: RepositoryDocument["status"] =
    category === "grant_policies" ? "Active" : category === "uploads" ? "Review" : year === "2026" ? "Active" : year === "2025" ? "Review" : "Archived";
  const tags =
    category === "grant_policies"
      ? ["Policy", "Grant", year ?? "Source"]
      : category === "uploads"
        ? ["Upload", "Indexed"]
        : ["Ordinance", year ?? "Municipal Code"];

  return {
    id: filename.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    name: documentName,
    type,
    department,
    uploadedAt: (record.modified ?? "").slice(0, 10),
    size: formatFileSize(record.size_bytes),
    status,
    tags,
    sourcePath: filename
  };
}

export async function GET() {
  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/documents`, { cache: "no-store" });
  } catch {
    return NextResponse.json(
      { error: "Cannot reach the MuniciPAL backend. Start it with: uvicorn src.api:app --port 8000" },
      { status: 502 }
    );
  }

  if (!response.ok) {
    return NextResponse.json({ error: `Backend returned ${response.status}` }, { status: 502 });
  }

  const records = (await response.json()) as BackendDocument[];
  const documents = records
    .map(toDocument)
    .sort((left, right) => right.uploadedAt.localeCompare(left.uploadedAt));

  return NextResponse.json({ documents });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/documents/upload`, {
      method: "POST",
      body: formData
    });
  } catch {
    return NextResponse.json(
      { error: "Cannot reach the MuniciPAL backend. Start it with: uvicorn src.api:app --port 8000" },
      { status: 502 }
    );
  }

  const payload = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: payload.detail ?? "Upload failed" }, { status: response.status });
  }

  return NextResponse.json(payload);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const filename = url.searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "Missing filename" }, { status: 400 });
  }

  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/documents/${encodeURIComponent(filename)}`, {
      method: "DELETE"
    });
  } catch {
    return NextResponse.json(
      { error: "Cannot reach the MuniciPAL backend. Start it with: uvicorn src.api:app --port 8000" },
      { status: 502 }
    );
  }

  const payload = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: payload.detail ?? "Delete failed" }, { status: response.status });
  }

  return NextResponse.json(payload);
}
