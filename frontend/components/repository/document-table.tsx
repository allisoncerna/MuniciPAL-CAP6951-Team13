import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";
import { DocumentActions } from "@/components/repository/document-actions";
import type { RepositoryDocument } from "@/lib/repository-data";

type DocumentTableProps = {
  documents: RepositoryDocument[];
};

const statusStyles = {
  Active: "success",
  Review: "warning",
  Archived: "muted"
} as const;

export function DocumentTable({ documents }: DocumentTableProps) {
  if (documents.length === 0) {
    return (
      <EmptyState
        title="No documents found"
        description="Try adjusting the search, sort, or filters to surface a different set of repository documents."
      />
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="hidden overflow-hidden lg:block">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr_0.7fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Document</span>
          <span>Type</span>
          <span>Department</span>
          <span>Uploaded</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-slate-200">
          {documents.map((document) => (
            <div
              key={document.id}
              className="grid w-full grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr_0.7fr_auto] items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
            >
              <DocumentCell document={document} />
              <span className="text-sm text-slate-600">{document.type}</span>
              <span className="text-sm text-slate-600">{document.department}</span>
              <span className="text-sm text-slate-600">{document.uploadedAt}</span>
              <span>
                <Badge tone={statusStyles[document.status]}>{document.status}</Badge>
              </span>
              <span className="flex justify-end">
                <DocumentActions documentName={document.name} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-200 lg:hidden">
        {documents.map((document) => (
          <div key={document.id} className="space-y-4 px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <DocumentCell document={document} />
              <Badge tone={statusStyles[document.status]}>{document.status}</Badge>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Detail label="Type" value={document.type} />
              <Detail label="Department" value={document.department} />
              <Detail label="Uploaded" value={document.uploadedAt} />
              <Detail label="Size" value={document.size} />
            </dl>

            <div className="flex justify-end border-t border-slate-100 pt-3">
              <DocumentActions documentName={document.name} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DocumentCell({ document }: { document: RepositoryDocument }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
        <FileText className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{document.name}</p>
        <p className="mt-1 text-xs text-slate-500">
          {document.size} · {document.tags.join(" · ")}
        </p>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-700">{value}</dd>
    </div>
  );
}