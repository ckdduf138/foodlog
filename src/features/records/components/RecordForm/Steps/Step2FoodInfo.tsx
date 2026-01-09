import React from "react";
import { FoodRecordFormData } from "@/features/records/types";
import { ProgressStarRating, PriceInput } from "@/shared/components/ui";
import { Utensils, Star, Receipt } from "lucide-react";
import { cn } from "@/shared/utils";

interface Step2FoodInfoProps {
  formData: FoodRecordFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRatingChange: (rating: number) => void;
  onPriceChange: (price: number | undefined) => void;
}

const FormSection = ({
  icon,
  label,
  optional,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-[var(--color-green-500)]">{icon}</span>
      <label className="text-base font-semibold text-[var(--color-foreground)]">
        {label}
      </label>
      {optional && (
        <span className="text-xs font-normal text-[var(--color-muted-foreground)] ml-1">
          (선택)
        </span>
      )}
    </div>
    {children}
  </div>
);

export const Step2FoodInfo: React.FC<Step2FoodInfoProps> = ({
  formData,
  onFormChange,
  onRatingChange,
  onPriceChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Food Name */}
      <FormSection icon={<Utensils className="w-5 h-5" />} label="어떤 음식을 드셨나요?">
        <input
          name="foodName"
          value={formData.foodName}
          onChange={onFormChange}
          placeholder="예: 삼겹살, 된장찌개, 파스타..."
          className={cn(
            "w-full p-4 text-base rounded-2xl",
            "bg-[var(--color-background)]",
            "border-2 border-[var(--color-border)]",
            "text-[var(--color-foreground)]",
            "placeholder:text-[var(--color-muted-foreground)]",
            "focus:outline-none focus:border-[var(--color-green-500)]",
            "focus:ring-2 focus:ring-[var(--color-green-500)]/20",
            "transition-all duration-200"
          )}
          autoFocus
        />
      </FormSection>

      {/* Rating */}
      <FormSection icon={<Star className="w-5 h-5" />} label="평점을 남겨주세요">
        <div
          className={cn(
            "rounded-2xl p-4",
            "bg-[var(--color-muted)]",
            "border border-[var(--color-border)]"
          )}
        >
          <ProgressStarRating
            rating={formData.rating}
            onChange={onRatingChange}
          />
        </div>
      </FormSection>

      {/* Price */}
      <FormSection icon={<Receipt className="w-5 h-5" />} label="가격" optional>
        <PriceInput
          value={formData.price}
          onChange={onPriceChange}
          placeholder="15,000"
        />
      </FormSection>
    </div>
  );
};
