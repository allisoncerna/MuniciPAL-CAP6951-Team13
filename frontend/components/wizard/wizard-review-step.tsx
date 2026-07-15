"use client";

import { useWatch } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { WizardFormValues } from "@/components/wizard/wizard-form";
import { useFormContext } from "react-hook-form";

export function ReviewStep() {
  const { control } = useFormContext<WizardFormValues>();
  const values = useWatch({ control });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review &amp; Generate</CardTitle>
        <CardDescription>Review your selections before generating the document</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Document Configuration</p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <SummaryItem label="Document Type" value={values?.documentType || "Not selected"} />
                <SummaryItem label="Department" value={values?.departmentName || "Not specified"} />
                <SummaryItem label="Program Name" value={values?.programName || "Not specified"} />
                <SummaryItem label="Department Type" value={values?.departmentType || "Not selected"} />
                <SummaryItem label="Target Audience" value={values?.audience?.length ? values.audience.join(", ") : "No audience selected"} fullWidth />
                <SummaryItem label="Additional Instructions" value={values?.additionalInstructions || "No instructions provided"} fullWidth />
              </dl>
            </div>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 text-center">
            <p className="text-sm font-semibold text-brand-700">Ready to Generate</p>
            <p className="mt-2 text-sm leading-6 text-brand-700/90">Your document will be generated using AI based on the selected municipal sources</p>
            <Button type="button" className="mt-4">
              Generate Draft
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryItem({ label, value, fullWidth = false }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{value}</dd>
    </div>
  );
}