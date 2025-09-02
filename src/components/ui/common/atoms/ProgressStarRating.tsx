import React, { useState, useRef, useCallback } from "react";
import { Star } from "lucide-react";

interface ProgressStarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  maxRating?: number;
  step?: number;
}

export const ProgressStarRating: React.FC<ProgressStarRatingProps> = ({
  rating,
  onChange,
  maxRating = 5,
  step = 0.1,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateRatingFromPosition = useCallback(
    (clientX: number, rect: DOMRect) => {
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const percentage = x / rect.width;
      const newRating = percentage * maxRating;
      const roundedRating = Math.round(newRating / step) * step;
      return Math.max(0.1, Math.min(maxRating, roundedRating));
    },
    [maxRating, step]
  );

  const updateRating = useCallback(
    (clientX: number) => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const newRating = calculateRatingFromPosition(clientX, rect);
        onChange(newRating);
      }
    },
    [calculateRatingFromPosition, onChange]
  );

  // 마우스 이벤트
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updateRating(e.clientX);

      const handleMouseMove = (e: MouseEvent) => {
        updateRating(e.clientX);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateRating]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      updateRating(e.clientX);
    },
    [updateRating]
  );

  // 터치 이벤트
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const touch = e.touches[0];
      updateRating(touch.clientX);

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        updateRating(touch.clientX);
      };

      const handleTouchEnd = () => {
        setIsDragging(false);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    },
    [updateRating]
  );

  return (
    <div className="space-y-2">
      {/* 슬라이더 영역 */}
      <div className="relative">
        {/* 슬라이더 트랙 */}
        <div
          ref={sliderRef}
          className="relative h-3 bg-gray-200 rounded-full cursor-pointer select-none touch-none"
          onClick={handleClick}
          onTouchStart={handleTouchStart}
        >
          {/* 채워진 트랙 - 연한 노란색에서 진한 노란색 그라데이션 */}
          <div
            className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-200"
            style={{ width: `${(rating / maxRating) * 100}%` }}
          />
        </div>

        {/* 별 모양 썸 (커서) */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-150 cursor-grab active:cursor-grabbing touch-none"
          style={{
            left: `${Math.max(4, Math.min(96, (rating / maxRating) * 100))}%`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className={`transition-all duration-200 ${
              isDragging ? "scale-110" : "hover:scale-105"
            }`}
          >
            <Star
              className={`w-8 h-8 text-yellow-500 fill-current drop-shadow-md ${
                isDragging ? "text-yellow-600" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* 별점 디스플레이와 숫자 - 우측 하단 */}
      <div className="flex items-center justify-end space-x-2">
        {/* 작은 별점 표시 */}
        <div className="flex items-center space-x-0.5">
          {[...Array(maxRating)].map((_, i) => {
            const fillPercentage = Math.max(
              0,
              Math.min(100, (rating - i) * 100)
            );

            return (
              <div key={i} className="relative">
                {/* 배경 별 */}
                <Star className="w-3 h-3 text-gray-300" />

                {/* 채워진 별 */}
                {fillPercentage > 0 && (
                  <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                  >
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 숫자 표시 */}
        <div className="flex items-center space-x-0.5">
          <span className="text-sm font-medium text-gray-700">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">/ 5.0</span>
        </div>
      </div>
    </div>
  );
};
