import React, { memo } from "react";
import { Calendar, Clock } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";
import { RatingDisplay } from "./RatingDisplay";

interface RecordHeaderProps {
  record: FoodRecord;
}

const RecordHeaderComponent: React.FC<RecordHeaderProps> = ({ record }) => {
  return (
    <div className="flex-1">
      {/* 레스토랑 이름 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--color-foreground)' }}>
        {record.restaurantName}
      </h1>
      
      {/* 별점 표시 */}
      <div className="mb-4">
        <RatingDisplay rating={record.rating} />
      </div>

      {/* 날짜와 시간 */}
      <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{record.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{record.time}</span>
        </div>
      </div>
    </div>
  );
};

RecordHeaderComponent.displayName = 'RecordHeader';

export const RecordHeader = memo(RecordHeaderComponent, (prevProps, nextProps) => {
  return (
    prevProps.record.restaurantName === nextProps.record.restaurantName &&
    prevProps.record.rating === nextProps.record.rating &&
    prevProps.record.date === nextProps.record.date &&
    prevProps.record.time === nextProps.record.time
  );
});
