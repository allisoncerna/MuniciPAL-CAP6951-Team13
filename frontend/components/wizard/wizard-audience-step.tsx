"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { audienceOptions } from "@/lib/wizard-data";
import { cn } from "@/lib/utils";
import type { WizardFormValues } from "@/components/wizard/wizard-form";

export function AudienceStep() {
  const { control } = useFormContext<WizardFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Who is the target audience?</CardTitle>
        <CardDescription>Select one or more audience groups for this document</CardDescription>
      </CardHeader>
      <CardContent>
        <Controller
          control={control}
          name="audience"
          render={({ field }) => (
            <div className="grid gap-3 sm:grid-cols-2">
              {audienceOptions.map((item) => {
                const active = field.value.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      field.onChange(active ? field.value.filter((value) => value !== item) : [...field.value, item])
                    }
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-4 text-left transition",
                      active ? "border-brand-500 bg-brand-50/60 ring-1 ring-brand-100" : "border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    <span className={cn("mt-0.5 flex h-5 w-5 items-center justify-center rounded border", active ? "border-brand-500 bg-brand-500 text-white" : "border-slate-300 bg-white")}>
                      {active ? <Check className="h-3 w-3" /> : null}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">{item}</span>
                      <span className="mt-1 block text-sm text-slate-500">
                        {item === "Residents" && "General public and community members"}
                        {item === "Internal Staff" && "Municipal employees and team members"}
                        {item === "City Council" && "Elected officials and decision makers"}
                        {item === "Grant Agency" && "Funding organizations and partners"}
                        {item === "General Public" && "Broader community and stakeholders"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}