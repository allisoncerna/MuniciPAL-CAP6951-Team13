"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/shared/section-header";
import { DocumentToolbar } from "@/components/repository/document-toolbar";
import { DocumentTable } from "@/components/repository/document-table";
import { DocumentPagination } from "@/components/repository/document-pagination";
import {
  repositoryEmptyState,
  repositoryFilterOptions,
  type RepositoryDocument,
  type RepositoryFilterKey,
  type RepositorySortKey
} from "@/lib/repository-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pageSize = 4;

export default function RepositoryPage() {
  const [documents, setDocuments] = useState<RepositoryDocument[]>([]);
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState<RepositorySortKey>("newest");
  const [activeFilter, setActiveFilter] = useState<RepositoryFilterKey>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionDocumentId, setActiveActionDocumentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      setLoadError(null);

      const response = await fetch("/api/repository", {
        headers: {
          Accept: "application/json"
        }
      });

      const payload = (await response.json()) as { documents?: RepositoryDocument[]; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? `Failed to load repository documents (${response.status})`);
      }

      setDocuments(payload.documents ?? []);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load repository documents.");
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDocuments();
  }, [loadDocuments]);

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = documents.filter((document) => {
      const matchesSearch =
        query.length === 0 ||
        [document.name, document.type, document.department, document.status, ...document.tags].some((value) =>
          value.toLowerCase().includes(query)
        );
      const matchesFilter = activeFilter === "All" || document.status === activeFilter;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((left, right) => {
      if (sortValue === "newest") return right.uploadedAt.localeCompare(left.uploadedAt);
      if (sortValue === "oldest") return left.uploadedAt.localeCompare(right.uploadedAt);
      if (sortValue === "name-asc") return left.name.localeCompare(right.name);
      return right.name.localeCompare(left.name);
    });
  }, [activeFilter, documents, search, sortValue]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleDocuments = filteredDocuments.slice(startIndex, startIndex + pageSize);
  const highlightCards = [
    { label: "Documents", value: String(documents.length) },
    { label: "Active", value: String(documents.filter((document) => document.status === "Active").length) },
    { label: "Under Review", value: String(documents.filter((document) => document.status === "Review").length) },
    { label: "Departments", value: String(new Set(documents.map((document) => document.department)).size) }
  ];

  function getDocumentUrl(document: RepositoryDocument, download = false) {
    if (document.localUrl) {
      return document.localUrl;
    }

    if (!document.sourcePath) {
      return null;
    }

    const encodedPath = encodeURIComponent(document.sourcePath);
    return `/api/repository/file?path=${encodedPath}${download ? "&download=1" : ""}`;
  }

  function openDocument(document: RepositoryDocument) {
    const url = getDocumentUrl(document);

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  function editDocument(document: RepositoryDocument) {
    const nextName = window.prompt("Edit document name", document.name);

    if (nextName === null) {
      return;
    }

    const trimmedName = nextName.trim();

    if (!trimmedName) {
      return;
    }

    setDocuments((current) =>
      current.map((item) => (item.id === document.id ? { ...item, name: trimmedName } : item))
    );
  }

  async function copyDocumentLink(document: RepositoryDocument) {
    const url = getDocumentUrl(document);

    if (!url) {
      return;
    }

    const linkToCopy = url.startsWith("blob:") ? url : `${window.location.origin}${url}`;
    await navigator.clipboard.writeText(linkToCopy);
  }

  function downloadDocument(document: RepositoryDocument) {
    const url = document.localUrl ?? getDocumentUrl(document, true);

    if (!url) {
      return;
    }

    const link = window.document.createElement("a");
    link.href = url;
    link.download = document.name;
    window.document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function deleteDocument(document: RepositoryDocument) {
    const confirmed = window.confirm(`Delete ${document.name}? This removes it from the retrieval index.`);

    if (!confirmed) {
      return;
    }

    if (document.localUrl) {
      URL.revokeObjectURL(document.localUrl);
    }

    if (document.sourcePath) {
      const response = await fetch(`/api/repository?filename=${encodeURIComponent(document.sourcePath)}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        window.alert(payload.error ?? "Failed to delete the document.");
        return;
      }
    }

    setDocuments((current) => current.filter((item) => item.id !== document.id));
    setActiveActionDocumentId((current) => (current === document.id ? null : current));
  }

  function handleToggleActions(documentId: string) {
    setActiveActionDocumentId((current) => (current === documentId ? null : documentId));
  }

  function handleUploadClick() {
    const input = window.document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) {
        return;
      }

      // Send the PDF to the backend, which extracts, chunks, and indexes it
      // so generated documents can immediately cite it.
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/repository", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        window.alert(payload.error ?? "Failed to upload the document.");
        return;
      }

      await loadDocuments();
      setCurrentPage(1);
      setActiveActionDocumentId(null);
    };

    input.click();
  }

  return (
    <AppShell>
      <div className="px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-6">
          <SectionHeader
            title="Document Repository"
            description="Search, filter, sort, and review source documents that feed the generation workflow"
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {highlightCards.map((item) => (
              <Card key={item.label}>
                <CardContent className="flex items-center justify-between py-5">
                  <div>
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <DocumentToolbar
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
              setActiveActionDocumentId(null);
            }}
            sortValue={sortValue}
            onSortChange={(value) => {
              setSortValue(value);
              setCurrentPage(1);
              setActiveActionDocumentId(null);
            }}
            filterOptions={repositoryFilterOptions}
            activeFilter={activeFilter}
            onFilterChange={(value) => {
              setActiveFilter(value);
              setCurrentPage(1);
              setActiveActionDocumentId(null);
            }}
            onUploadClick={handleUploadClick}
          />

          {isLoading ? (
            <Card>
              <CardContent className="py-14">
                <div className="mx-auto max-w-lg text-center">
                  <Badge tone="muted">Loading</Badge>
                  <h2 className="mt-4 text-xl font-semibold text-slate-900">Loading repository documents</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Fetching the latest data from the backend.</p>
                </div>
              </CardContent>
            </Card>
          ) : loadError ? (
            <Card>
              <CardContent className="py-14">
                <div className="mx-auto max-w-lg text-center">
                  <Badge tone="warning">Backend error</Badge>
                  <h2 className="mt-4 text-xl font-semibold text-slate-900">Unable to load documents</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{loadError}</p>
                </div>
              </CardContent>
            </Card>
          ) : filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="py-14">
                <div className="mx-auto max-w-lg text-center">
                  <Badge tone="muted">Empty state</Badge>
                  <h2 className="mt-4 text-xl font-semibold text-slate-900">{repositoryEmptyState.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{repositoryEmptyState.description}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-0 rounded-2xl border border-slate-200 bg-white shadow-panel">
              <DocumentTable
                documents={visibleDocuments}
                activeActionDocumentId={activeActionDocumentId}
                onToggleActions={handleToggleActions}
                onViewDocument={openDocument}
                onEditDocument={editDocument}
                onCopyLinkDocument={copyDocumentLink}
                onDownloadDocument={downloadDocument}
                onDeleteDocument={deleteDocument}
              />
              <DocumentPagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={filteredDocuments.length}
                pageSize={pageSize}
                onPrevious={() => {
                  setCurrentPage((value) => Math.max(1, value - 1));
                  setActiveActionDocumentId(null);
                }}
                onNext={() => {
                  setCurrentPage((value) => Math.min(totalPages, value + 1));
                  setActiveActionDocumentId(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
