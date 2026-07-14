"use client";

import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { departmentOptions } from "@/lib/wizard-data";
import type { WizardFormValues } from "@/components/wizard/wizard-form";

export function DepartmentStep() {
  const { register } = useFormContext<WizardFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Information</CardTitle>
        <CardDescription>Tell us about your department and program.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Field label="Department Name">
          <Input {...register("departmentName")} placeholder="e.g., Parks & Recreation" />
        </Field>
        <Field label="Program Name">
          <Input {...register("programName")} placeholder="e.g., Youth Summer Programs" />
        </Field>
        <Field label="Department Type">
          <div className="relative">
            <select
              {...register("departmentType")}
              className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="">Select department type</option>
              {departmentOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </Field>
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