import React from "react";
import { FoodRecordFormData } from "@/features/records/types";
import { MessageSquare, Lightbulb } from "lucide-react";
import { cn } from "@/shared/utils";

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
  const maxLength = 500;
  const currentLength = formData.review?.length || 0;

  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-green-500)]">
          <MessageSquare className="w-5 h-5" />
        </span>
        <label className="text-base font-semibold text-[var(--color-foreground)]">
          리뷰를 남겨주세요
        </label>
        <span className="text-xs font-normal text-[var(--color-muted-foreground)] ml-1">
          (선택)
        </span>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <div className="relative">
          <textarea
            name="review"
            value={formData.review}
            onChange={onFormChange}
            placeholder="어떤 점이 좋았나요? 또 방문하고 싶은가요?
            맛, 서비스, 분위기 등 자유롭게 기록해보세요."
            maxLength={maxLength}
            className={cn(
              "w-full p-4 text-base rounded-2xl resize-none",
              "bg-[var(--color-background)]",
              "border-2 border-[var(--color-border)]",
              "text-[var(--color-foreground)]",
              "placeholder:text-[var(--color-muted-foreground)]",
              "focus:outline-none focus:border-[var(--color-green-500)]",
              "focus:ring-2 focus:ring-[var(--color-green-500)]/20",
              "transition-all duration-200",
              "min-h-[160px]"
            )}
            rows={6}
          />
        </div>

        {/* Character count */}
        <div className="flex justify-end">
          <span
            className={cn(
              "text-xs",
              currentLength > maxLength * 0.9
                ? "text-[var(--color-destructive)]"
                : "text-[var(--color-muted-foreground)]"
            )}
          >
            {currentLength}/{maxLength}
          </span>
        </div>
      </div>

      {/* Tip card */}
      <div
        className={cn(
          "rounded-2xl p-4",
          "bg-[var(--color-green-100)]",
          "border border-[var(--color-green-200)]"
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              "bg-[var(--color-green-500)]"
            )}
          >
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--color-green-800)]">
              팁: 나중에 봤을 때 도움이 될 내용을 적어보세요
            </p>
            <p className="text-xs text-[var(--color-green-700)]">
              리뷰는 언제든 수정할 수 있어요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
