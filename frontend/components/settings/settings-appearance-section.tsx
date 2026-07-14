"use client";

import { useState } from "react";
import { SettingsSection } from "@/components/settings/settings-section";
import { Switch } from "@/components/ui/switch";

export function SettingsAppearanceSection() {
  const [compactMode, setCompactMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  return (
    <SettingsSection title="Appearance" description="Customize how the workspace feels during daily use.">
      <div className="space-y-5">
        <SettingRow
          title="Compact spacing"
          description="Tighten vertical spacing in tables and cards for denser workflows."
          checked={compactMode}
          onCheckedChange={setCompactMode}
          ariaLabel="Toggle compact spacing"
        />
        <SettingRow
          title="Reduce motion"
          description="Limit decorative motion and transitions throughout the interface."
          checked={reduceMotion}
          onCheckedChange={setReduceMotion}
          ariaLabel="Toggle reduce motion"
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