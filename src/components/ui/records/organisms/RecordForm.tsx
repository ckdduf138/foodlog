"use client";

import React, { useState } from "react";
import MapSearch from "../places/MapSearch";
import { PlaceSelect } from "../places/PlaceSearch";
import { FoodRecordFormData } from "@/types";
import { StarRating } from "../../common/atoms";

interface RecordFormProps {
  formData: FoodRecordFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRatingChange: (rating: number) => void;
  onPlaceSelect: (place: PlaceSelect) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  error: string | null;
  isEditMode: boolean;
}

const STEPS = [
  { id: 1, title: "위치 선택", description: "어디서 드셨나요?" },
  { id: 2, title: "음식 정보", description: "무엇을 드셨나요?" },
  { id: 3, title: "리뷰", description: "상세한 후기를 남겨보세요" },
  { id: 4, title: "사진", description: "사진도 함께 남겨보세요" },
  { id: 5, title: "완료", description: "기록을 저장하시겠습니까?" },
];

export const RecordForm = ({
  formData,
  onFormChange,
  onRatingChange,
  onPlaceSelect,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
  isEditMode,
}: RecordFormProps) => {
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <MapSearch onPlaceSelect={onPlaceSelect} />
            {formData.location.placeName && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-800">
                  {formData.location.placeName}
                </p>
                <p className="text-sm text-green-600">
                  {formData.location.address}
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                음식명 *
              </label>
              <input
                name="foodName"
                value={formData.foodName}
                onChange={onFormChange}
                placeholder="예: 김치찌개, 아메리카노..."
                className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                평점 *
              </label>
              <div className="flex justify-center py-4">
                <StarRating
                  rating={formData.rating}
                  onChange={onRatingChange}
                  size="lg"
                  readonly={false}
                />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-green-600">
                  {formData.rating}/5
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                가격 (선택사항)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₩
                </span>
                <input
                  type="number"
                  name="price"
                  value={formData.price ?? ""}
                  onChange={onFormChange}
                  placeholder="15000"
                  className="w-full pl-8 pr-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <textarea
              name="review"
              value={formData.review}
              onChange={onFormChange}
              placeholder="맛있었던 점, 아쉬웠던 점 등을 자유롭게 적어보세요..."
              className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={6}
            />
            <p className="text-sm text-gray-500 text-center">
              리뷰는 나중에 추가할 수도 있어요
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={onFormChange}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="space-y-2">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-lg font-medium text-gray-600">
                    사진 추가하기
                  </p>
                  <p className="text-sm text-gray-400">
                    클릭하여 사진을 선택하세요
                  </p>
                </div>
              </label>
            </div>
            <p className="text-sm text-gray-500 text-center">
              사진은 나중에 추가할 수도 있어요
            </p>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">장소</span>
                <span className="font-medium">
                  {formData.location.placeName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">음식</span>
                <span className="font-medium">{formData.foodName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">평점</span>
                <span className="font-medium">{formData.rating}/5 ⭐</span>
              </div>
              {formData.price && (
                <div className="flex justify-between">
                  <span className="text-gray-600">가격</span>
                  <span className="font-medium">
                    ₩{formData.price?.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-green-600">
            {currentStep} / {STEPS.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / STEPS.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {STEPS[currentStep - 1].title}
        </h2>
        <p className="text-gray-600">{STEPS[currentStep - 1].description}</p>
      </div>

      {/* Step Content */}
      <div className="mb-8 min-h-[200px] flex items-center">
        <div className="w-full">{renderStepContent()}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={currentStep === 1 ? onCancel : prevStep}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {currentStep === 1 ? "취소" : "이전"}
        </button>

        {currentStep < STEPS.length ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceedFromCurrentStep()}
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 transition-colors"
          >
            {isSubmitting ? "저장 중..." : "완료"}
          </button>
        )}
      </div>
    </div>
  );
};
