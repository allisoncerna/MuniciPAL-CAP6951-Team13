import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type WizardNavigationProps = {
  stepIndex: number;
  stepCount: number;
  onBack: () => void;
  onNext: () => void;
};

export function WizardNavigation({ stepIndex, stepCount, onBack, onNext }: WizardNavigationProps) {
  const lastStep = stepIndex === stepCount - 1;

  return (
    <div className="flex items-center justify-between gap-3">
      <Button type="button" variant="secondary" onClick={onBack} disabled={stepIndex === 0}>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <Button type="button" onClick={onNext}>
        {lastStep ? "Generate Draft" : "Next"}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}