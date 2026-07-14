"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/shared/section-header";
import { DocumentToolbar } from "@/components/repository/document-toolbar";
import { DocumentTable } from "@/components/repository/document-table";
import { DocumentPagination } from "@/components/repository/document-pagination";
import {
  repositoryDocuments,
  repositoryEmptyState,
  repositoryFilterOptions,
  repositorySortOptions,
  type RepositoryFilterKey,
  type RepositorySortKey
} from "@/lib/repository-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { repositoryHighlights } from "@/lib/repository-data";

const pageSize = 4;

export default function RepositoryPage() {
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState<RepositorySortKey>("newest");
  const [activeFilter, setActiveFilter] = useState<RepositoryFilterKey>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = repositoryDocuments.filter((document) => {
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
  }, [activeFilter, search, sortValue]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleDocuments = filteredDocuments.slice(startIndex, startIndex + pageSize);

  return (
    <AppShell>
      <div className="px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-6">
          <SectionHeader
            eyebrow="Document Repository"
            title="Manage source documents"
            description="Search, filter, sort, and review the source documents that feed the generation workflow."
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {repositoryHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label}>
                  <CardContent className="flex items-center justify-between py-5">
                    <div>
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{item.value}</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <DocumentToolbar
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            sortValue={sortValue}
            onSortChange={(value) => {
              setSortValue(value);
              setCurrentPage(1);
            }}
            filterOptions={repositoryFilterOptions}
            activeFilter={activeFilter}
            onFilterChange={(value) => {
              setActiveFilter(value);
              setCurrentPage(1);
            }}
            onUploadClick={() => undefined}
          />

          {filteredDocuments.length === 0 ? (
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
              <DocumentTable documents={visibleDocuments} />
              <DocumentPagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={filteredDocuments.length}
                pageSize={pageSize}
                onPrevious={() => setCurrentPage((value) => Math.max(1, value - 1))}
                onNext={() => setCurrentPage((value) => Math.min(totalPages, value + 1))}
              />
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}