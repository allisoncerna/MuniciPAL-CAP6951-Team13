"use client";

import { SettingsSection } from "@/components/settings/settings-section";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const documentFormats = ["PDF", "DOCX", "Markdown"];

export function SettingsDocumentDefaultsSection() {
  const [autoSaveDrafts, setAutoSaveDrafts] = useState(true);

  return (
    <SettingsSection title="Document Defaults" description="Set default output preferences for new documents">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Default Document Type">
          <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
            <option>Service Description</option>
            <option>Compliance Summary</option>
            <option>Public Report</option>
          </select>
        </Field>
        <Field label="Default Export Format">
          <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
            {documentFormats.map((format) => (
              <option key={format}>{format}</option>
            ))}
          </select>
        </Field>

        <div className="md:col-span-2">
          <SettingRow
            title="Auto-save drafts"
            description="Store intermediate drafts automatically while generating or editing documents"
            checked={autoSaveDrafts}
            onCheckedChange={setAutoSaveDrafts}
            ariaLabel="Toggle auto-save drafts"
          />
        </div>
      </div>
    </SettingsSection>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-slate-900">{label}</span>
      {children}
    </label>
  );
}

function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
  ariaLabel
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} ariaLabel={ariaLabel} />
    </div>
  );
}