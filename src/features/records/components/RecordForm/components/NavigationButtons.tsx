import React from "react";
import { Loader2 } from "lucide-react";
import { STEPS } from "../constants/steps";

interface NavigationButtonsProps {
  currentStep: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  canProceed,
  isSubmitting,
  onNext,
  onSubmit,
}) => {
  const buttonStyle = (isEnabled: boolean) => ({
    backgroundColor: isEnabled
      ? "var(--color-green-500)"
      : "var(--color-accent)",
    color: isEnabled ? "white" : "var(--color-accent-foreground)",
    opacity: !isEnabled ? 0.7 : 1,
  });

  return (
    <div>
      {currentStep < STEPS.length ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="w-full py-3 px-6 rounded-xl font-semibold shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          style={buttonStyle(canProceed)}
        >
          다음
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-xl font-semibold shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          style={buttonStyle(!isSubmitting)}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            </div>
          ) : (
            "완료"
          )}
        </button>
      )}
    </div>
  );
};
