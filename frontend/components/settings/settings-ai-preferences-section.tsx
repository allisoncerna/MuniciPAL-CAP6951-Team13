"use client";

import { useState } from "react";
import { SettingsSection } from "@/components/settings/settings-section";
import { Switch } from "@/components/ui/switch";

export function SettingsAiPreferencesSection() {
  const [strictSources, setStrictSources] = useState(true);
  const [draftTone, setDraftTone] = useState(false);
  const [autoSummaries, setAutoSummaries] = useState(true);

  return (
    <SettingsSection title="AI Preferences" description="Define AI generation behavior used for drafts">
      <div className="space-y-5">
        <SettingRow
          title="Strict source grounding"
          description="Prioritize official municipal documents and reduce unsupported generation"
          checked={strictSources}
          onCheckedChange={setStrictSources}
          ariaLabel="Toggle strict source grounding"
        />
        <SettingRow
          title="Conversational draft tone"
          description="Use a conversational tone in first-pass drafts when the audience allows it"
          checked={draftTone}
          onCheckedChange={setDraftTone}
          ariaLabel="Toggle conversational draft tone"
        />
        <SettingRow
          title="Auto-generate summaries"
          description="Create a short executive summary for generated documents by default"
          checked={autoSummaries}
          onCheckedChange={setAutoSummaries}
          ariaLabel="Toggle auto-generate summaries"
        />
      </div>
    </SettingsSection>
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