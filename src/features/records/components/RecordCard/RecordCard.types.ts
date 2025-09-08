export interface RecordCardProps {
  record: import("@/features/records/types").FoodRecord;
  onClick?: (record: import("@/features/records/types").FoodRecord) => void;
  variant?: "default" | "compact";
}
