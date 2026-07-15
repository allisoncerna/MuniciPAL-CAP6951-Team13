"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { documentTypes } from "@/lib/wizard-data";
import { cn } from "@/lib/utils";
import type { WizardFormValues } from "@/components/wizard/wizard-form";

export function DocumentTypeStep() {
  const { control } = useFormContext<WizardFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>What would you like to generate?</CardTitle>
        <CardDescription>Select the type of document you want to create</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Controller
          control={control}
          name="documentType"
          render={({ field }) => (
            <div className="space-y-4">
              {documentTypes.map((item) => {
                const Icon = item.icon;
                const active = field.value === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => field.onChange(item.id)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition",
                      active ? "border-brand-500 bg-brand-50/60 ring-1 ring-brand-100" : "border-slate-200 hover:border-brand-200 hover:bg-slate-50"
                    )}
                  >
                    <span className={cn("mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl", active ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-600")}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                        {active ? <Badge>Selected</Badge> : null}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-500">{item.description}</span>
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