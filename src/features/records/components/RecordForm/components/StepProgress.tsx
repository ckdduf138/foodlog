import React from "react";
import { STEPS } from "../constants/steps";

interface StepProgressProps {
  currentStep: number;
  canProceed: boolean;
  setStep: (step: number) => void;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  setStep,
}) => {
  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setStep(step);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleStepClick(index + 1)}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300`}
              style={{
                backgroundColor:
                  index + 1 <= currentStep
                    ? "var(--color-green-500)"
                    : "var(--color-border)",
                color:
                  index + 1 <= currentStep
                    ? "white"
                    : "var(--color-foreground)",
                border:
                  index + 1 <= currentStep
                    ? "none"
                    : "1px solid var(--color-border)",
              }}
            >
              {index + 1 < currentStep ? "✓" : step.id}
            </div>
            <span
              className="text-xs mt-1 text-center"
              style={{
                color:
                  index + 1 === currentStep
                    ? "var(--color-green-600)"
                    : "var(--color-muted-foreground)",
              }}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Line */}
      <div className="relative">
        <div
          className="w-full h-1 rounded-full"
          style={{ backgroundColor: "var(--color-muted)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              backgroundColor: "var(--color-green-500)",
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
