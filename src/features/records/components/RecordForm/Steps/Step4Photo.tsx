import React from "react";
import Image from "next/image";
import { Camera, ImagePlus, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils";

interface Step4PhotoProps {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoPreview: string | null;
}

export const Step4Photo: React.FC<Step4PhotoProps> = ({
  onFormChange,
  photoPreview,
}) => {
  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-green-500)]">
          <Camera className="w-5 h-5" />
        </span>
        <label className="text-base font-semibold text-[var(--color-foreground)]">
          음식 사진을 추가해보세요
        </label>
        <span className="text-xs font-normal text-[var(--color-muted-foreground)] ml-1">
          (선택)
        </span>
      </div>

      {/* Upload Area */}
      <div className="relative">
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={onFormChange}
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className={cn(
            "cursor-pointer block overflow-hidden",
            "border-2 border-dashed rounded-2xl",
            "border-[var(--color-border)]",
            "hover:border-[var(--color-green-500)]",
            "hover:bg-[var(--color-green-50)]",
            "transition-all duration-200",
            "touch-manipulation"
          )}
        >
          {photoPreview ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photoPreview}
                alt="선택된 음식 사진"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                priority
              />
              {/* Overlay on hover */}
              <div
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center",
                  "bg-black/40 opacity-0 hover:opacity-100",
                  "transition-opacity duration-200"
                )}
              >
                <ImagePlus className="w-8 h-8 text-white mb-2" />
                <p className="text-white font-medium text-sm">사진 변경하기</p>
              </div>
            </div>
          ) : (
            <div className="py-12 px-4 text-center">
              <div
                className={cn(
                  "w-16 h-16 mx-auto rounded-2xl",
                  "bg-[var(--color-green-100)]",
                  "flex items-center justify-center",
                  "mb-4"
                )}
              >
                <ImagePlus className="w-8 h-8 text-[var(--color-green-500)]" />
              </div>
              <p className="text-base font-semibold text-[var(--color-foreground)] mb-1">
                탭하여 사진 추가
              </p>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                JPG, PNG 형식 지원
              </p>
            </div>
          )}
        </label>
      </div>

      {/* Info card */}
      <div
        className={cn(
          "rounded-2xl p-4",
          "bg-[var(--color-green-100)]",
          "border border-[var(--color-green-200)]"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              "bg-[var(--color-green-500)]"
            )}
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm font-medium text-[var(--color-green-800)]">
            사진은 언제든지 추가하거나 변경할 수 있어요
          </p>
        </div>
      </div>
    </div>
  );
};
