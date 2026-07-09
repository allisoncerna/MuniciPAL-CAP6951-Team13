import { cn } from "@/lib/utils";
import { wizardSteps } from "@/lib/wizard-data";

type WizardStepperProps = {
  currentStep: number;
};

export function WizardStepper({ currentStep }: WizardStepperProps) {
  return (
    <ol className="flex items-start gap-2 overflow-x-auto pb-2 sm:gap-4">
      {wizardSteps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <li key={step.id} className="flex min-w-[108px] flex-1 flex-col items-center text-center sm:min-w-0">
            <div className="flex w-full items-center gap-2">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm transition-colors",
                  isComplete
                    ? "border-brand-500 bg-brand-500 text-white"
                    : isActive
                      ? "border-brand-500 bg-white text-brand-500 ring-4 ring-brand-100"
                      : "border-slate-200 bg-white text-slate-400"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              {index < wizardSteps.length - 1 ? <div className={cn("h-px flex-1", isComplete ? "bg-brand-500" : "bg-slate-200")} /> : null}
            </div>
            <span className={cn("mt-2 text-xs font-medium", isActive || isComplete ? "text-slate-900" : "text-slate-400")}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}