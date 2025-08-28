import { MapPin, Calendar, Clock } from "lucide-react";
import { StarRating, Badge } from "../atoms";
import { FoodRecord } from "@/lib/db";

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
  const isCompact = variant === "compact";

  return (
    <div
      className={`bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer hover:border-green-200 ${
        isCompact ? "p-3" : "p-3 sm:p-4"
      }`}
      onClick={() => onClick?.(record)}
    >
      {/* 음식 정보 */}
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-gray-900 mb-1 truncate ${
              isCompact ? "text-sm" : "text-sm sm:text-base"
            }`}
          >
            {record.foodName}
          </h3>
          <p
            className={`text-gray-600 truncate ${
              isCompact ? "text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {record.restaurantName}
          </p>
        </div>
        <div className="flex-shrink-0 ml-2">
          <StarRating rating={record.rating} size={isCompact ? "sm" : "sm"} />
        </div>
      </div>

      {/* 위치 및 날짜 정보 */}
      <div className="space-y-1 mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 text-gray-500 min-w-0">
          <MapPin className={isCompact ? "w-3 h-3" : "w-3 h-3 sm:w-4 sm:h-4"} />
          <span
            className={`truncate ${
              isCompact ? "text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {record.location.address}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar
              className={isCompact ? "w-3 h-3" : "w-3 h-3 sm:w-4 sm:h-4"}
            />
            <span className={isCompact ? "text-xs" : "text-xs sm:text-sm"}>
              {record.date}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock
              className={isCompact ? "w-3 h-3" : "w-3 h-3 sm:w-4 sm:h-4"}
            />
            <span className={isCompact ? "text-xs" : "text-xs sm:text-sm"}>
              {record.time}
            </span>
          </div>
        </div>
      </div>

      {/* 한줄평 */}
      {record.review && (
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mt-2 sm:mt-3">
          <p
            className={`text-gray-700 italic line-clamp-2 ${
              isCompact ? "text-xs" : "text-xs sm:text-sm"
            }`}
          >
            "{record.review}"
          </p>
        </div>
      )}

      {/* 사진이 있는 경우 표시 */}
      {record.photo && (
        <div className="mt-2 sm:mt-3">
          <Badge variant="success" size="sm">
            📷 사진 있음
          </Badge>
        </div>
      )}
    </div>
  );
};
