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
    value: React.ReactNode
  ) => (
    <div className="flex items-start space-x-3 py-3">
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--color-green-100)" }}
      >
        <Icon className="w-4 h-4" style={{ color: "var(--color-green-600)" }} />
      </div>
      <div className="flex-1">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--color-green-600)" }}
        >
          {label}
        </p>
        <div
          className="font-semibold mt-1"
          style={{ color: "var(--color-foreground)" }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div
        className="rounded-2xl overflow-hidden shadow-sm"
        style={{
          backgroundColor: "var(--color-card)",
          border: "1px solid var(--color-border)",
        }}
      >
        {photoPreview && (
          <div className="relative w-full aspect-square max-h-64">
            <img
              src={photoPreview}
              alt="Food preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        <div className="p-4 space-y-1">
          {renderDetailItem(MapPin, "장소", formData.location.placeName)}
          {renderDetailItem(Utensils, "음식", formData.foodName)}
          {renderDetailItem(
            Star,
            "평점",
            <div className="flex items-center space-x-2">
              <span className="font-bold">{formData.rating.toFixed(1)}</span>
              <span
                className="text-sm"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                / 5.0
              </span>
            </div>
          )}
          {formData.price &&
            renderDetailItem(
              CreditCard,
              "가격",
              `₩${formData.price.toLocaleString()}`
            )}
        </div>
      </div>

      {error && (
        <div
          className="p-3 rounded-xl flex items-center space-x-2"
          style={{
            backgroundColor: "var(--color-destructive)",
            color: "var(--color-destructive-foreground)",
          }}
        >
          <XCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};
