"use client";

import React, { useState, useEffect } from "react";
import { FoodRecordFormData } from "@/types";
import { PlaceSelect } from "@/components/ui/records/places/PlaceSearch";
import {
  Step1Location,
  Step2FoodInfo,
  Step3Review,
  Step4Photo,
  Step5Confirm,
} from "./RecordFormSteps";
import { ChevronLeft, Loader2 } from "lucide-react";

interface RecordFormProps {
  formData: FoodRecordFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRatingChange: (rating: number) => void;
  onPriceChange: (price: number | undefined) => void;
  onPlaceSelect: (place: PlaceSelect) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  error: string | null;
  isEditMode: boolean;
}

const STEPS = [
  {
    id: 1,
    title: "위치",
    subtitle: "어디서 드셨나요?",
  },
  {
    id: 2,
    title: "음식 정보",
    subtitle: "무엇을 드셨나요?",
  },
  {
    id: 3,
    title: "후기",
    subtitle: "어떠셨나요?",
  },
  {
    id: 4,
    title: "사진",
    subtitle: "기억을 남겨보세요",
  },
  {
    id: 5,
    title: "완료",
    subtitle: "기록을 저장하시겠습니까?",
  },
];

export const RecordForm = ({
  formData,
  onFormChange,
  onRatingChange,
  onPriceChange,
  onPlaceSelect,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
}: RecordFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (formData.photo && typeof formData.photo !== "string") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(formData.photo);
    } else if (typeof formData.photo === "string") {
      setPhotoPreview(formData.photo);
    }
  }, [formData.photo]);

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

  const canProceedFromCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.location.placeName && formData.location.address;
      case 2:
        return formData.foodName.trim() !== "" && formData.rating > 0;
      case 3:
        return true; // 리뷰는 선택사항
      case 4:
        return true; // 사진은 선택사항
      default:
        return true;
    }
  };

  const resizeImage = (
    file: File,
    maxWidth: number = 1080,
    maxHeight: number = 1080,
    quality: number = 0.8
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // 원본 비율 유지하면서 최대 크기 제한
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        // JPEG로 압축하여 용량 최적화
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange(e);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 파일 크기 체크 (10MB 제한)
      if (file.size > 10 * 1024 * 1024) {
        alert("사진 크기가 너무 큽니다. 10MB 이하의 사진을 선택해주세요.");
        return;
      }

      try {
        // 모바일 최적화된 해상도로 리사이즈
        const resizedDataUrl = await resizeImage(file, 1080, 1080, 0.8);
        setPhotoPreview(resizedDataUrl);
      } catch (error) {
        console.error("이미지 처리 중 오류:", error);
        // 오류 시 원본 이미지 사용
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setPhotoPreview(null);
    }
  };

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
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="sticky top-0 z-10 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={currentStep === 1 ? onCancel : prevStep}
            className="p-2 -m-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm font-medium text-gray-600">
            {currentStep} / {STEPS.length}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold text-gray-900 mb-1">
          {STEPS[currentStep - 1].title}
        </h1>
        <p className="text-gray-600 text-sm">
          {STEPS[currentStep - 1].subtitle}
        </p>
      </div>

      {/* Step Content */}
      <div
        className={`${
          currentStep === 1 ? "min-h-[50vh]" : "min-h-[400px]"
        } flex items-start`}
      >
        <div className="w-full">{renderStepContent()}</div>
      </div>

      {/* Navigation */}
      <div className="mt-3">
        {currentStep < STEPS.length ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceedFromCurrentStep()}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                저장 중...
              </div>
            ) : (
              "완료"
            )}
          </button>
        )}
      </div>
    </div>
  );
};
