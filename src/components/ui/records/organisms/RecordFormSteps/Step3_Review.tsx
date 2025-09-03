import React from "react";
import { FoodRecordFormData } from "@/types";
import { Info } from "lucide-react";

interface Step3ReviewProps {
  formData: FoodRecordFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const Step3Review: React.FC<Step3ReviewProps> = ({
  formData,
  onFormChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <textarea
            name="review"
            value={formData.review}
            onChange={onFormChange}
            placeholder="맛있었던 점, 아쉬웠던 점 등을 자유롭게 적어보세요..."
            className="w-full p-4 text-base border-2 rounded-2xl transition-all duration-200 resize-none focus:outline-none focus:ring-2"
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
            rows={5}
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-3 border border-purple-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm text-purple-700 font-medium">
            리뷰는 나중에 추가하거나 수정할 수도 있어요
          </p>
        </div>
      </div>
    </div>
  );
};
