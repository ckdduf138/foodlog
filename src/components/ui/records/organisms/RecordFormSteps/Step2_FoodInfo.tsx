import React from "react";
import { FoodRecordFormData } from "@/types";
import { StarRating } from "@/components/ui/common/atoms";

interface Step2FoodInfoProps {
  formData: FoodRecordFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRatingChange: (rating: number) => void;
}

export const Step2FoodInfo: React.FC<Step2FoodInfoProps> = ({
  formData,
  onFormChange,
  onRatingChange,
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
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100">
          <div className="flex justify-center py-1">
            <StarRating
              rating={formData.rating}
              onChange={onRatingChange}
              size="lg"
              readonly={false}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {formData.rating}/5
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900">
          가격{" "}
          <span className="text-sm font-normal text-gray-500">(선택사항)</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base font-semibold">
            ₩
          </div>
          <input
            type="number"
            name="price"
            value={formData.price ?? ""}
            onChange={onFormChange}
            placeholder="15,000"
            className="w-full pl-10 pr-4 py-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};
