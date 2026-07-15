import { readdirSync, statSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { RepositoryDocument } from "@/lib/repository-data";

export const dynamic = "force-dynamic";

type FileRecord = {
  filePath: string;
  relativePath: string;
  mtimeMs: number;
  size: number;
};

function collectPdfFiles(rootDir: string): FileRecord[] {
  const records: FileRecord[] = [];

  function walk(currentDir: string) {
    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== ".pdf") {
        continue;
      }

      records.push({
        filePath: fullPath,
        relativePath: path.relative(rootDir, fullPath),
        mtimeMs: statSync(fullPath).mtimeMs,
        size: Number(statSync(fullPath).size)
      });
    }
  }

  walk(rootDir);
  return records;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function toDocument(record: FileRecord): RepositoryDocument {
  const relativeParts = record.relativePath.split(path.sep);
  const topLevelFolder = relativeParts[0] ?? "documents";
  const yearSegment = relativeParts.find((segment) => /^\d{4}$/.test(segment));
  const documentName = path.basename(record.filePath, path.extname(record.filePath));

  const type = topLevelFolder === "grant_policies" ? "Policy" : "Ordinance";
  const department = topLevelFolder === "grant_policies" ? "Grant Policies" : `Ordinances${yearSegment ? ` ${yearSegment}` : ""}`;
  const status: RepositoryDocument["status"] = topLevelFolder === "grant_policies" ? "Active" : yearSegment === "2026" ? "Active" : yearSegment === "2025" ? "Review" : "Archived";
  const tags =
    topLevelFolder === "grant_policies"
      ? ["Policy", "Grant", yearSegment ?? "Source"]
      : ["Ordinance", yearSegment ?? "Municipal Code"];

  return {
    id: record.relativePath.replace(/\\/g, "/").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    name: documentName,
    type,
    department,
    uploadedAt: new Date(record.mtimeMs).toISOString().slice(0, 10),
    size: formatFileSize(record.size),
    status,
    tags,
    sourcePath: record.relativePath.replace(/\\/g, "/")
  };
}

export async function GET() {
  const repositoryRoot = path.resolve(process.cwd(), "..", "data", "raw");
  const documents = collectPdfFiles(repositoryRoot)
    .map(toDocument)
    .sort((left, right) => right.uploadedAt.localeCompare(left.uploadedAt));

  return NextResponse.json({ documents });
}