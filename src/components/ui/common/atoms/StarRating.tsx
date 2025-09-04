import { Star } from "lucide-react";
import { getRatingText } from "@/utils/records";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
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
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex gap-0.5" title={getRatingText(Math.round(rating))}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} transition-colors ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          } ${!readonly ? "cursor-pointer hover:text-yellow-300" : ""}`}
          onClick={!readonly ? () => onChange?.(i + 1) : undefined}
        />
      ))}
    </div>
  );
};
