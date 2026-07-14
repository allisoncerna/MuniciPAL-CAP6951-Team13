import { SettingsSection } from "@/components/settings/settings-section";

export function SettingsAboutSection() {
  return (
    <SettingsSection title="About" description="Reference details for this MuniciPAL workspace.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoTile label="Product" value="MuniciPAL" />
        <InfoTile label="Version" value="1.0.0" />
        <InfoTile label="Environment" value="Frontend Preview" />
        <InfoTile label="Modeling" value="RAG-first workflow" />
      </div>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500">
        MuniciPAL is designed for municipal staff who need compliant, source-grounded draft generation across policies,
        grant agreements, ordinances, and reports.
      </p>
    </SettingsSection>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}