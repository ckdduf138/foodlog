"use client";

import React from "react";
import { FoodRecordFormData, PlaceSelect } from "@/features/records/types";
import {
  Step1Location,
  Step2FoodInfo,
  Step3Review,
  Step4Photo,
  Step5Confirm,
} from "./Steps";
import { StepProgress, NavigationButtons } from "./components";
import { useRecordForm, usePhotoHandler } from "./hooks";

interface RecordFormProps {
  formData: FoodRecordFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRatingChange: (rating: number) => void;
  onPriceChange: (price: number | undefined) => void;
  onPlaceSelect: (place: PlaceSelect) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  error: string | null;
  isEditMode: boolean;
}

export const RecordForm = ({
  formData,
  onFormChange,
  onRatingChange,
  onPriceChange,
  onPlaceSelect,
  onSubmit,
  isSubmitting,
  error,
}: RecordFormProps) => {
  const { currentStep, setCurrentStep, nextStep, canProceedFromCurrentStep } =
    useRecordForm();

  const { photoPreview, handlePhotoChange } = usePhotoHandler(
    formData.photo,
    onFormChange
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Location formData={formData} onPlaceSelect={onPlaceSelect} />
        );
      case 2:
        return (
          <Step2FoodInfo
            formData={formData}
            onFormChange={onFormChange}
            onRatingChange={onRatingChange}
            onPriceChange={onPriceChange}
          />
        );
      case 3:
        return <Step3Review formData={formData} onFormChange={onFormChange} />;
      case 4:
        return (
          <Step4Photo
            onFormChange={handlePhotoChange}
            photoPreview={photoPreview}
          />
        );
      case 5:
        return (
          <Step5Confirm
            formData={formData}
            error={error}
            photoPreview={photoPreview}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto relative">
      <StepProgress currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* Step Content */}
      <div
        className={`${
          currentStep === 1 ? "min-h-[50vh]" : "min-h-[400px]"
        } flex items-start`}
      >
        <div className="w-full">{renderStepContent()}</div>
      </div>

      <NavigationButtons
        currentStep={currentStep}
        canProceed={canProceedFromCurrentStep(formData)}
        isSubmitting={isSubmitting}
        onNext={nextStep}
        onSubmit={onSubmit}
      />
    </div>
  );
};
