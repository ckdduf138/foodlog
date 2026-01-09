import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "xs" | "sm" | "md" | "lg";
  readonly?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  readonly = true,
  onChange,
}: StarRatingProps) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // 각 별의 채움 정도 계산 (0~1)
  const getStarFillPercentage = (index: number) => {
    const starRating = rating - index;
    if (starRating >= 1) return 1; // 완전히 채움
    if (starRating <= 0) return 0; // 비어있음
    return starRating; // 부분적으로 채움 (0.1 ~ 0.9)
  };

  return (
    <div className="flex gap-0.5">
      {[...Array(maxRating)].map((_, i) => {
        const fillPercentage = getStarFillPercentage(i);
        
        return (
          <div key={i} className="relative inline-block">
            {/* 배경 별 (비어있는 상태) */}
            <Star
              className={`${sizeClasses[size]} text-gray-300 dark:text-gray-600 ${!readonly ? "cursor-pointer" : ""}`}
              onClick={!readonly ? () => onChange?.(i + 1) : undefined}
            />
            {/* 채워진 별 (clip으로 부분만 표시) */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star
                className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400 dark:text-yellow-500 dark:fill-yellow-500`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
