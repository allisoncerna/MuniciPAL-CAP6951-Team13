"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { WizardFormValues } from "@/components/wizard/wizard-form";

export function InstructionsStep() {
  const { register } = useFormContext<WizardFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional instructions</CardTitle>
        <CardDescription>Provide any special requirements, constraints, or tone guidance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field label="Instructions">
          <Textarea
            {...register("additionalInstructions")}
            placeholder="Describe the purpose, goals, requirements, or information that should be included in this document. Be as specific as possible to help generate accurate content."
            className="min-h-[220px]"
          />
        </Field>
        <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Tip: Include specific requirements, target outcomes, compliance standards, or key messages you want to communicate.
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-900">{label}</span>
      {children}
    </label>
  );
}