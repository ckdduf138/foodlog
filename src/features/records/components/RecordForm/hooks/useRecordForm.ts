import { useState } from "react";
import { FoodRecordFormData } from "@/features/records/types";
import { STEPS } from "../constants/steps";

export const useRecordForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const setStep = (step: number) => {
    if (step <= STEPS.length) {
      setCurrentStep(step);
    }
  };

  const canProceedFromCurrentStep = (formData: FoodRecordFormData): boolean => {
    switch (currentStep) {
      case 1:
        const hasLocation =
          formData.location.placeName &&
          formData.location.address &&
          formData.location.latitude &&
          formData.location.longitude;
        return !!hasLocation;
      case 2:
        return formData.foodName.trim() !== "" && formData.rating > 0;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return true;
    }
  };

  return {
    currentStep,
    setStep,
    canProceedFromCurrentStep,
  };
};
