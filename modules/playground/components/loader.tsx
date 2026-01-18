import React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

interface LoadingStepProps {
  step: number;
  currentStep: number;
  label: string;
}

const LoadingStep: React.FC<LoadingStepProps> = ({
  step,
  currentStep,
  label,
}) => {
  return (
    <div className="flex items-center gap-3 py-2">
      {step < currentStep ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : step === currentStep ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : (
        <div className="h-5 w-5 rounded-full border-2 border-muted" />
      )}
      <span
        className={
          step === currentStep
            ? "font-medium text-foreground"
            : "text-muted-foreground"
        }
      >
        {label}
      </span>
    </div>
  );
};

export default LoadingStep;
