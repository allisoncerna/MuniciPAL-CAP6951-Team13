import { readFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getSafeFilePath(relativePath: string) {
  const rootDir = path.resolve(process.cwd(), "..", "data", "raw");
  const resolvedPath = path.resolve(rootDir, relativePath);

  if (path.relative(rootDir, resolvedPath).startsWith("..")) {
    return null;
  }

  return resolvedPath;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const relativePath = url.searchParams.get("path");

  if (!relativePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const safePath = getSafeFilePath(relativePath);

  if (!safePath) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const fileBuffer = readFileSync(safePath);
    const fileName = path.basename(safePath);
    const disposition = url.searchParams.get("download") === "1" ? "attachment" : "inline";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${fileName}"`
      }
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}