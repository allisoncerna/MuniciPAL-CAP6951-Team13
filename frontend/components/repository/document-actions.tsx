"use client";

import { Copy, Download, Edit, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type DocumentActionsProps = {
  documentName: string;
};

const actions = [
  { label: "View", icon: Eye },
  { label: "Edit", icon: Edit },
  { label: "Copy link", icon: Copy },
  { label: "Download", icon: Download },
  { label: "Delete", icon: Trash2, destructive: true }
];

export function DocumentActions({ documentName }: DocumentActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={`Open actions for ${documentName}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-brand-200 hover:text-brand-600"
      >
        <EllipsisVertical className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-panel">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-50",
                  action.destructive ? "text-rose-600 hover:bg-rose-50" : "text-slate-700"
                )}
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}