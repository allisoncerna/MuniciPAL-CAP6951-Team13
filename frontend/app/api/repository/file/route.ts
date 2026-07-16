import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// FastAPI backend (src/api.py). Override with MUNICIPAL_API_URL in .env.local.
const BACKEND_URL = process.env.MUNICIPAL_API_URL ?? "http://localhost:8000";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const relativePath = url.searchParams.get("path");

  if (!relativePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  // The backend serves documents by base filename regardless of folder.
  const fileName = relativePath.split("/").pop() ?? relativePath;
  const download = url.searchParams.get("download") === "1";

  let response: Response;

  try {
    response = await fetch(
      `${BACKEND_URL}/api/documents/${encodeURIComponent(fileName)}/file${download ? "?download=true" : ""}`,
      { cache: "no-store" }
    );
  } catch {
    return NextResponse.json(
      { error: "Cannot reach the MuniciPAL backend. Start it with: uvicorn src.api:app --port 8000" },
      { status: 502 }
    );
  }

  if (!response.ok) {
    return NextResponse.json({ error: "File not found" }, { status: response.status });
  }

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${fileName}"`
    }
  });
}
