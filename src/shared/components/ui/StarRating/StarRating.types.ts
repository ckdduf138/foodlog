export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  onChange?: (rating: number) => void;
}
