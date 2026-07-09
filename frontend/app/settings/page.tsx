import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/shared/section-header";
import { SettingsProfileSection } from "@/components/settings/settings-profile-section";
import { SettingsAppearanceSection } from "@/components/settings/settings-appearance-section";
import { SettingsAiPreferencesSection } from "@/components/settings/settings-ai-preferences-section";
import { SettingsDocumentDefaultsSection } from "@/components/settings/settings-document-defaults-section";
import { SettingsAboutSection } from "@/components/settings/settings-about-section";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <SectionHeader
            eyebrow="Settings"
            title="Workspace preferences"
            description="Configure the profile, appearance, AI behavior, and document defaults for the workspace."
          />

          <div className="grid gap-6">
            <SettingsProfileSection />

            <div className="grid gap-6 lg:grid-cols-2">
              <SettingsAppearanceSection />
              <SettingsAiPreferencesSection />
            </div>

            <SettingsDocumentDefaultsSection />
            <SettingsAboutSection />
          </div>
        </div>
      </div>
    </AppShell>
  );
}