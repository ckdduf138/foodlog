import React from "react";
import { FoodRecordFormData } from "@/types";
import { MapPin, Utensils, Star, CreditCard, XCircle } from "lucide-react";

interface Step5ConfirmProps {
  formData: FoodRecordFormData;
  error: string | null;
}

export const Step5Confirm: React.FC<Step5ConfirmProps> = ({
  formData,
  error,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900 text-center">
          입력하신 정보가 맞나요?
        </h3>

        <div className="rounded-2xl p-3 space-y-2 border border-gray-200">
          {/* Place */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-gray-600 font-medium">장소</span>
            </div>
            <span className="font-semibold text-gray-900 text-right flex-1 ml-4">
              {formData.location.placeName}
            </span>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Food */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Utensils className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-gray-600 font-medium">음식</span>
            </div>
            <span className="font-semibold text-gray-900">
              {formData.foodName}
            </span>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Rating */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-600" fill="currentColor" />
              </div>
              <span className="text-gray-600 font-medium">평점</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">
                {formData.rating}/5
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < formData.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          </div>

          {formData.price && (
            <>
              <div className="border-t border-gray-100"></div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-600 font-medium">가격</span>
                </div>
                <span className="font-semibold text-gray-900">
                  ₩{formData.price?.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <XCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
