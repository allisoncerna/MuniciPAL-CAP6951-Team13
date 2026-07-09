"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { WizardNavigation } from "@/components/wizard/wizard-navigation";
import { WizardStepper } from "@/components/wizard/wizard-stepper";
import { wizardSteps } from "@/lib/wizard-data";
import { DocumentTypeStep } from "@/components/wizard/wizard-document-type-step";
import { DepartmentStep } from "@/components/wizard/wizard-department-step";
import { AudienceStep } from "@/components/wizard/wizard-audience-step";
import { InstructionsStep } from "@/components/wizard/wizard-instructions-step";
import { ReviewStep } from "@/components/wizard/wizard-review-step";

export type WizardFormValues = {
  documentType: string;
  departmentName: string;
  programName: string;
  departmentType: string;
  audience: string[];
  additionalInstructions: string;
};

const defaultValues: WizardFormValues = {
  documentType: "service-description",
  departmentName: "",
  programName: "",
  departmentType: "",
  audience: ["Residents", "Internal Staff"],
  additionalInstructions: ""
};

const stepComponents = [DocumentTypeStep, DepartmentStep, AudienceStep, InstructionsStep, ReviewStep];

export function WizardForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const methods = useForm<WizardFormValues>({ defaultValues, mode: "onChange" });
  const ActiveStep = stepComponents[stepIndex];

  const goBack = () => setStepIndex((current) => Math.max(0, current - 1));
  const goNext = () => setStepIndex((current) => Math.min(wizardSteps.length - 1, current + 1));

  return (
    <FormProvider {...methods}>
      <div className="px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <SectionHeader
            eyebrow="Document Generation Wizard"
            title="Build compliant municipal documents"
            description="Follow a guided workflow to assemble, review, and generate a draft grounded in municipal source materials."
          />

          <Card className="p-4 sm:p-6">
            <WizardStepper currentStep={stepIndex} />
          </Card>

          <div className="space-y-6">
            <ActiveStep />
            <WizardNavigation stepIndex={stepIndex} stepCount={wizardSteps.length} onBack={goBack} onNext={goNext} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}