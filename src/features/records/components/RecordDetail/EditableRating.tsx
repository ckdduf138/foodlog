"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface EditableRatingProps {
  rating: number;
  onSave: (rating: number) => Promise<void>;
}

export const EditableRating: React.FC<EditableRatingProps> = ({ rating, onSave }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleClick = async (newRating: number) => {
    if (newRating === rating || isSaving) return;

    setIsSaving(true);
    try {
      await onSave(newRating);
    } catch (error) {
      alert("별점 저장 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"));
    } finally {
      setIsSaving(false);
    }
  };

  const displayRating = hoveredRating ?? rating;

  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(null)}
          disabled={isSaving}
          className="transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
          title={`${star}점`}
        >
          <Star
            className="w-6 h-6 sm:w-7 sm:h-7"
            fill={star <= displayRating ? "#FBBF24" : "transparent"}
            style={{
              color: star <= displayRating ? "#FBBF24" : "var(--color-border)",
              stroke: star <= displayRating ? "#F59E0B" : "var(--color-border)",
            }}
          />
        </button>
      ))}
    </div>
  );
};
