"use client";

import { useRef, useState, useCallback } from "react";

interface UseSwipeDeleteOptions {
  threshold?: number;    // 삭제 확정 임계값 (px)
  onDelete: () => void;
}

export const useSwipeDelete = ({
  threshold = 80,
  onDelete,
}: UseSwipeDeleteOptions) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const directionLockedRef = useRef<"horizontal" | "vertical" | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isConfirming) return;
      startXRef.current = e.touches[0].clientX;
      startYRef.current = e.touches[0].clientY;
      directionLockedRef.current = null;
      setIsDragging(true);
    },
    [isConfirming]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || isConfirming) return;

      const deltaX = e.touches[0].clientX - startXRef.current;
      const deltaY = e.touches[0].clientY - startYRef.current;

      // 첫 이동 방향을 잠근다
      if (!directionLockedRef.current) {
        if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
          directionLockedRef.current =
            Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
        }
        return;
      }

      // 수직 스크롤이면 스와이프 무시
      if (directionLockedRef.current === "vertical") return;

      // 왼쪽 스와이프만 허용 (오른쪽은 0 이하로 클램프)
      const clamped = Math.min(0, deltaX);
      setOffsetX(clamped);
    },
    [isDragging, isConfirming]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || isConfirming) return;
    setIsDragging(false);

    if (offsetX <= -threshold) {
      // 임계값 초과: 삭제 확인 상태로 전환
      setIsConfirming(true);
      setOffsetX(-threshold);
    } else {
      // 임계값 미달: 원위치
      setOffsetX(0);
    }
  }, [isDragging, isConfirming, offsetX, threshold]);

  const confirmDelete = useCallback(() => {
    setOffsetX(-300); // 슬라이드 아웃
    setTimeout(() => {
      onDelete();
      setIsConfirming(false);
      setOffsetX(0);
    }, 200);
  }, [onDelete]);

  const cancelDelete = useCallback(() => {
    setIsConfirming(false);
    setOffsetX(0);
  }, []);

  const swipeProgress = Math.min(1, Math.abs(offsetX) / threshold);

  return {
    offsetX,
    isDragging,
    isConfirming,
    swipeProgress,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    confirmDelete,
    cancelDelete,
  };
};
