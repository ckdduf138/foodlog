"use client";

import { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { useSwipeDelete } from "@/shared/hooks/useSwipeDelete";
import { cn } from "@/shared/utils";

interface SwipeableItemProps {
  children: ReactNode;
  onDelete: () => void;
  className?: string;
}

export const SwipeableItem = ({
  children,
  onDelete,
  className,
}: SwipeableItemProps) => {
  const {
    offsetX,
    isDragging,
    isConfirming,
    swipeProgress,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    confirmDelete,
    cancelDelete,
  } = useSwipeDelete({ threshold: 80, onDelete });

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      {/* 삭제 배경 (스와이프 시 나타남) */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-5 rounded-2xl"
        style={{
          backgroundColor: `rgba(239, 68, 68, ${swipeProgress * 0.9})`,
        }}
        aria-hidden="true"
      >
        <div
          className="flex flex-col items-center gap-1 transition-all"
          style={{ opacity: swipeProgress }}
        >
          <Trash2
            className="w-5 h-5 text-white"
            style={{
              transform: `scale(${0.7 + swipeProgress * 0.3})`,
            }}
          />
          <span className="text-xs text-white font-medium">
            {isConfirming ? "삭제" : "밀어서 삭제"}
          </span>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div
        className={cn(
          "relative",
          !isDragging && "transition-transform duration-200"
        )}
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>

      {/* 삭제 확인 오버레이 */}
      {isConfirming && (
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[var(--color-background)]/95 rounded-2xl z-10 animate-fade-in">
          <span className="text-sm font-medium text-[var(--color-foreground)]">
            삭제할까요?
          </span>
          <button
            onClick={confirmDelete}
            className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-semibold active:scale-95 transition-transform"
          >
            삭제
          </button>
          <button
            onClick={cancelDelete}
            className="px-3 py-1.5 rounded-lg bg-[var(--color-muted)] text-[var(--color-foreground)] text-sm font-semibold active:scale-95 transition-transform"
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
};
