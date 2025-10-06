"use client";

import React, { memo } from "react";
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
}

// 별점에 따른 색상 반환
const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return "#F59E0B"; // amber-500
  if (rating >= 4.0) return "#FBBF24"; // amber-400
  if (rating >= 3.5) return "#FCD34D"; // amber-300
  if (rating >= 3.0) return "#FDE68A"; // amber-200
  return "#D1D5DB"; // gray-300
};

export const RatingDisplay: React.FC<RatingDisplayProps> = memo(({ rating }) => {
  const ratingColor = getRatingColor(rating);

  return (
    <div 
      className="inline-flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl shadow-sm"
      style={{
        background: `linear-gradient(135deg, ${ratingColor}15 0%, ${ratingColor}08 100%)`,
        border: `1.5px solid ${ratingColor}40`,
      }}
    >
      {/* 별점 아이콘 그룹 */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= rating;
          return (
            <Star
              key={star}
              className="w-6 h-6 transition-all"
              fill={isFilled ? ratingColor : "none"}
              style={{ 
                color: isFilled ? ratingColor : 'var(--color-muted-foreground)',
                strokeWidth: 2,
                filter: isFilled ? `drop-shadow(0 0 2px ${ratingColor}80)` : 'none'
              }}
            />
          );
        })}
      </div>

      {/* 별점 숫자 */}
      <span 
        className="text-xl font-bold leading-none"
        style={{ color: ratingColor }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.rating === nextProps.rating;
});

RatingDisplay.displayName = "RatingDisplay";
