import { MapPin } from "lucide-react";
import { StarRating } from "@/components/ui/common/atoms";
import { FoodRecord } from "@/types";
import { useRouter } from "next/navigation";

interface FoodRecordCardProps {
  record: FoodRecord;
  onClick?: (record: FoodRecord) => void;
  variant?: "default" | "compact";
}

export const FoodRecordCard = ({
  record,
  onClick,
  variant = "default",
}: FoodRecordCardProps) => {
  const router = useRouter();
  const isCompact = variant === "compact";

  const handleClick = () => {
    if (onClick) {
      onClick(record);
    } else {
      router.push(`/records/${record.id}`);
    }
  };

  return (
    <div
      className={`bg-[var(--color-background)] rounded-2xl shadow-sm border border-[var(--color-border)] hover:shadow-lg transition-all duration-300 cursor-pointer ${
        isCompact ? "p-3" : "p-4"
      }`}
      onClick={handleClick}
    >
      {/* 상단: 음식명, 식당명 + 우측 별점, 사진 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0 pr-3">
          <h3
            className={`font-bold text-[var(--color-foreground)] leading-tight mb-1 ${
              isCompact ? "text-sm" : "text-base"
            }`}
          >
            {record.foodName}
          </h3>
          <p
            className={`text-[var(--color-muted-foreground)] font-medium ${
              isCompact ? "text-xs" : "text-sm"
            }`}
          >
            {record.restaurantName}
          </p>
        </div>

        {/* 우측: 별점 + 사진 */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <StarRating rating={record.rating} size="sm" />
          {record.photo && (
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src={record.photo}
                alt="Food preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* 하단: 위치 & 가격 */}
      <div
        className="flex items-center justify-between pt-2 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div
          className="flex items-center gap-1.5 min-w-0 flex-1 mr-3"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span
            className={`truncate font-medium ${
              isCompact ? "text-xs" : "text-xs"
            }`}
          >
            {record.location.address}
          </span>
        </div>
        <div
          className={`text-right flex-shrink-0 ${
            isCompact ? "text-sm" : "text-base"
          }`}
        >
          <span
            className="font-bold"
            style={{ color: "var(--color-green-600)" }}
          >
            ₩{record.price?.toLocaleString() || "0"}
          </span>
        </div>
      </div>
    </div>
  );
};
