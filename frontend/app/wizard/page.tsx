"use client";

import { AppShell } from "@/components/layout/app-shell";
import { WizardForm } from "@/components/wizard/wizard-form";

export default function WizardPage() {
  return (
    <AppShell>
      <WizardForm />
    </AppShell>
  );
}