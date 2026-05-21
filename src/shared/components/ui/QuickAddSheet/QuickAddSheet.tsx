"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, CheckCircle2 } from "lucide-react";
import { StarRating } from "@/shared/components/ui/StarRating";
import { useRecords } from "@/features/records/hooks/useRecords";
import { cn } from "@/shared/utils";

interface QuickAddSheetProps {
  open: boolean;
  onClose: () => void;
}

type Step = 1 | 2;

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const nowTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export const QuickAddSheet = ({ open, onClose }: QuickAddSheetProps) => {
  const [step, setStep] = useState<Step>(1);
  const [foodName, setFoodName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addRecord } = useRecords();

  // 시트가 열릴 때 초기화 및 포커스
  useEffect(() => {
    if (open) {
      setStep(1);
      setFoodName("");
      setRestaurantName("");
      setRating(0);
      setSuccess(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const canProceedStep1 = foodName.trim().length > 0;
  const canSubmit = canProceedStep1 && rating > 0;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      await addRecord({
        date: today(),
        time: nowTime(),
        restaurantName: restaurantName.trim() || foodName.trim(),
        location: { address: "", latitude: 0, longitude: 0 },
        foodName: foodName.trim(),
        rating,
        review: "",
        price: 0,
      });

      // 햅틱 피드백
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(50);
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 900);
    } catch {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* 백드롭 */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 바텀시트 */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-[var(--color-background)] rounded-t-3xl shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full"
        )}
        role="dialog"
        aria-label="빠른 음식 기록 추가"
      >
        {/* 핸들 */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[var(--color-muted)]" />
        </div>

        <div className="px-5 pb-8 pt-2">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-foreground)]">
                빠른 기록
              </h2>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                {step === 1 ? "음식 이름을 입력해주세요" : "별점을 남겨주세요"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--color-muted)] transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-[var(--color-muted-foreground)]" />
            </button>
          </div>

          {/* 스텝 인디케이터 */}
          <div className="flex gap-1.5 mb-6">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1 rounded-full flex-1 transition-colors duration-200",
                  s <= step
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-muted)]"
                )}
              />
            ))}
          </div>

          {/* 성공 상태 */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <CheckCircle2 className="w-14 h-14 text-[var(--color-primary)]" />
              <p className="text-base font-semibold text-[var(--color-foreground)]">
                기록 완료!
              </p>
            </div>
          ) : step === 1 ? (
            /* 스텝 1: 음식명 + 식당명 */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
                  음식 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canProceedStep1) setStep(2);
                  }}
                  placeholder="예: 된장찌개, 파스타"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-base",
                    "bg-[var(--color-muted)] border-0 outline-none",
                    "text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]",
                    "focus:ring-2 focus:ring-[var(--color-primary)]"
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
                  식당 이름 <span className="text-[var(--color-muted-foreground)] font-normal">(선택)</span>
                </label>
                <input
                  type="text"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canProceedStep1) setStep(2);
                  }}
                  placeholder="예: 강남 맛집"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-base",
                    "bg-[var(--color-muted)] border-0 outline-none",
                    "text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]",
                    "focus:ring-2 focus:ring-[var(--color-primary)]"
                  )}
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className={cn(
                  "w-full py-3.5 rounded-2xl font-semibold text-base",
                  "flex items-center justify-center gap-2",
                  "transition-all duration-200",
                  canProceedStep1
                    ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] active:scale-95"
                    : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] cursor-not-allowed"
                )}
              >
                다음
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* 스텝 2: 별점 */
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-base font-semibold text-[var(--color-foreground)] mb-1">
                  {foodName}
                </p>
                {restaurantName && (
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {restaurantName}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <StarRating
                  rating={rating}
                  onChange={setRating}
                  size="lg"
                  readonly={false}
                />
              </div>

              <p className="text-center text-sm text-[var(--color-muted-foreground)]">
                {rating === 0
                  ? "별점을 선택해주세요"
                  : ["", "별로예요", "그냥 그래요", "괜찮아요", "맛있어요", "최고예요"][rating]}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 rounded-2xl font-semibold text-sm bg-[var(--color-muted)] text-[var(--color-foreground)] transition-all active:scale-95"
                >
                  이전
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                  className={cn(
                    "flex-[2] py-3.5 rounded-2xl font-semibold text-base",
                    "transition-all duration-200",
                    canSubmit && !submitting
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] active:scale-95"
                      : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] cursor-not-allowed"
                  )}
                >
                  {submitting ? "저장 중..." : "저장하기"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 홈 인디케이터 영역 */}
        <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </div>
    </>
  );
};
