import React from "react";
import { FoodRecordFormData } from "@/types";
import { MapPin, Utensils, Star, CreditCard, XCircle } from "lucide-react";

interface Step5ConfirmProps {
  formData: FoodRecordFormData;
  error: string | null;
  photoPreview: string | null;
}

export const Step5Confirm: React.FC<Step5ConfirmProps> = ({
  formData,
  error,
  photoPreview,
}) => {
  const renderDetailItem = (
    Icon: React.ElementType,
    label: string,
    value: React.ReactNode,
    iconColor: string
  ) => (
    <div className="flex items-start space-x-4 py-3">
      <div className="flex-shrink-0 w-8 flex justify-center">
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="font-semibold text-gray-800 mt-0.5">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900 text-center">
        입력하신 정보가 맞나요?
      </h3>

      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {photoPreview && (
          <div className="relative w-full aspect-square max-h-64">
            <img
              src={photoPreview}
              alt="Food preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4 divide-y divide-gray-100">
          {renderDetailItem(
            MapPin,
            "장소",
            formData.location.placeName,
            "text-blue-500"
          )}
          {renderDetailItem(
            Utensils,
            "음식",
            formData.foodName,
            "text-orange-500"
          )}
          {renderDetailItem(
            Star,
            "평점",
            <div className="flex items-center space-x-2">
              <span className="font-bold">{formData.rating.toFixed(1)}</span>
              <span className="text-sm text-gray-400">/ 5.0</span>
            </div>,
            "text-yellow-500"
          )}
          {formData.price &&
            renderDetailItem(
              CreditCard,
              "가격",
              `₩${formData.price.toLocaleString()}`,
              "text-green-500"
            )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center space-x-2">
          <XCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};
