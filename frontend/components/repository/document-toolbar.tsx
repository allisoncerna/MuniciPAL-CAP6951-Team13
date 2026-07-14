"use client";

import { Upload, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RepositoryFilterKey, RepositorySortKey } from "@/lib/repository-data";

type DocumentToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  sortValue: RepositorySortKey;
  onSortChange: (value: RepositorySortKey) => void;
  filterOptions: RepositoryFilterKey[];
  activeFilter: RepositoryFilterKey;
  onFilterChange: (value: RepositoryFilterKey) => void;
  onUploadClick: () => void;
};

const sortLabels: Record<RepositorySortKey, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  "name-asc": "Name A-Z",
  "name-desc": "Name Z-A"
};

export function DocumentToolbar({
  search,
  onSearchChange,
  sortValue,
  onSortChange,
  filterOptions,
  activeFilter,
  onFilterChange,
  onUploadClick
}: DocumentToolbarProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search documents, departments, tags..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={sortValue}
              onChange={(event) => onSortChange(event.target.value as RepositorySortKey)}
              className="h-11 appearance-none rounded-xl border border-slate-200 bg-slate-50 px-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <Button type="button" onClick={onUploadClick} className="whitespace-nowrap">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((filter) => {
          const active = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                active
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-slate-50"
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}