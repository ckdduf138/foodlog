import React from "react";
import { FoodRecordFormData } from "@/types";
import { ProgressStarRating, PriceInput } from "@/components/ui/common/atoms";

interface Step2FoodInfoProps {
  formData: FoodRecordFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRatingChange: (rating: number) => void;
  onPriceChange: (price: number | undefined) => void;
}

export const Step2FoodInfo: React.FC<Step2FoodInfoProps> = ({
  formData,
  onFormChange,
  onRatingChange,
  onPriceChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Food Name */}
      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900 mb-2">
          어떤 음식을 드셨나요?
        </label>
        <div className="relative">
          <input
            name="foodName"
            value={formData.foodName}
            onChange={onFormChange}
            placeholder="예: 김치찌개, 아메리카노..."
            className="w-full p-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder-gray-400"
            autoFocus
          />
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900">
          평점을 남겨주세요
        </label>
        <div className=" rounded-2xl p-6">
          <ProgressStarRating
            rating={formData.rating}
            onChange={onRatingChange}
          />
        </div>
      </div>

      {/* Price */}
      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900">
          가격{" "}
          <span className="text-sm font-normal text-gray-500">(선택사항)</span>
        </label>
        <PriceInput
          value={formData.price}
          onChange={onPriceChange}
          placeholder="15,000"
        />
      </div>
    </div>
  );
};
