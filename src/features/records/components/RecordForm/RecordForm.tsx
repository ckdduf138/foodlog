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
  const { currentStep, setStep, canProceedFromCurrentStep } = useRecordForm();

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
      <StepProgress currentStep={currentStep} setStep={setStep} />

      {/* Step Content - 하단 버튼 공간 확보 */}
      <div className="py-2" style={{ paddingBottom: 'calc(80px + var(--safe-area-inset-bottom))' }}>
        <div className="w-full">{renderStepContent()}</div>
      </div>

      {/* Fixed Bottom Navigation Buttons - BottomNavigation 위에 위치 */}
      <div 
        className="fixed left-0 right-0 bg-[var(--color-background)] border-t border-[var(--color-border)] shadow-lg z-40"
        style={{
          bottom: 'calc(var(--bottom-nav-height) + var(--safe-area-inset-bottom))',
          padding: '1rem',
        }}
      >
        <div className="max-w-md mx-auto">
          <NavigationButtons
            currentStep={currentStep}
            canProceed={canProceedFromCurrentStep(formData)}
            isSubmitting={isSubmitting}
            setStep={setStep}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};
