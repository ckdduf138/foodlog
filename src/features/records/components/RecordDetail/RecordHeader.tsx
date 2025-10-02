import React from "react";
import { Calendar, Clock, Star } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";

interface RecordHeaderProps {
  record: FoodRecord;
}

export const RecordHeader: React.FC<RecordHeaderProps> = ({ record }) => {
  return (
    <div className="flex-1">
      {/* 레스토랑 이름 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--color-foreground)' }}>
        {record.restaurantName}
      </h1>
      
      {/* 별점 */}
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="w-6 h-6"
            fill={star <= record.rating ? "#FBBF24" : "none"}
            style={{ color: star <= record.rating ? "#FBBF24" : 'var(--color-muted-foreground)' }}
          />
        ))}
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
