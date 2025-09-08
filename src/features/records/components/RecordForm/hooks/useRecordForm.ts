import { useState } from "react";
import { FoodRecordFormData } from "@/features/records/types";
import { STEPS } from "../constants/steps";

export const useRecordForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
        console.log("Step 1 validation - Location data:", formData.location);
        console.log("Can proceed from step 1:", hasLocation);
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
    setCurrentStep,
    nextStep,
    prevStep,
    canProceedFromCurrentStep,
  };
};
