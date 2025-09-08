import React from "react";
import { FoodRecordFormData } from "@/features/records/types";
import { ProgressStarRating, PriceInput } from "@/shared/components/ui";

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
        <label
          className="block text-base font-semibold mb-2"
          style={{ color: "var(--color-foreground)" }}
        >
          어떤 음식을 드셨나요?
        </label>
        <div className="relative">
          <input
            name="foodName"
            value={formData.foodName}
            onChange={onFormChange}
            placeholder="삼겹살"
            className="w-full p-4 text-base border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--color-background)",
              borderColor: "var(--color-border)",
              color: "var(--color-foreground)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-green-500)";
              e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--color-border)";
              e.target.style.boxShadow = "none";
            }}
            autoFocus
          />
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <label
          className="block text-base font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          평점을 남겨주세요
        </label>
        <div className=" rounded-2xl p-2">
          <ProgressStarRating
            rating={formData.rating}
            onChange={onRatingChange}
          />
        </div>
      </div>

      {/* Price */}
      <div className="space-y-3">
        <label
          className="block text-base font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          가격{" "}
          <span
            className="text-sm font-normal"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            (선택사항)
          </span>
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
