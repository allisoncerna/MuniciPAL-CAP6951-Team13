import { Input } from "@/components/ui/input";
import { SettingsSection } from "@/components/settings/settings-section";

const departments = ["Parks & Recreation", "Community Development", "Public Works", "Administration"];

export function SettingsProfileSection() {
  return (
    <SettingsSection title="Profile" description="Update the information shown across your workspace.">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="First Name">
          <Input defaultValue="Sarah" />
        </Field>
        <Field label="Last Name">
          <Input defaultValue="Johnson" />
        </Field>
        <Field label="Email Address" className="md:col-span-2">
          <Input defaultValue="sjohnson@municipality.gov" type="email" />
        </Field>
        <Field label="Department" className="md:col-span-2">
          <div className="relative">
            <select className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
              {departments.map((department) => (
                <option key={department}>{department}</option>
              ))}
            </select>
          </div>
        </Field>
      </div>
    </SettingsSection>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-slate-900">{label}</span>
      {children}
    </label>
  );
}