import React from "react";
import { Calendar, Clock } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";
import { EditableField } from "./EditableField";
import { EditableRating } from "./EditableRating";

interface RecordHeaderProps {
  record: FoodRecord;
  onUpdateRestaurantName: (name: string) => Promise<void>;
  onUpdateRating: (rating: number) => Promise<void>;
}

const RecordHeader: React.FC<RecordHeaderProps> = ({ 
  record, 
  onUpdateRestaurantName,
  onUpdateRating 
}) => {
  return (
    <div className="flex-1">
      {/* 레스토랑 이름 - 편집 가능 */}
      <div className="mb-3">
        <EditableField
          value={record.restaurantName}
          onSave={onUpdateRestaurantName}
          placeholder="레스토랑 이름"
          className="text-2xl sm:text-3xl font-bold"
          editClassName="text-2xl sm:text-3xl font-bold"
        />
      </div>
      
      {/* 별점 - 편집 가능 */}
      <div className="mb-3">
        <EditableRating rating={record.rating} onSave={onUpdateRating} />
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

export default RecordHeader;
