import React from "react";
import type { FoodRecord } from "@/features/records/types";

const RecordHeader: React.FC<{ record: FoodRecord }> = ({ record }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-foreground)' }}>{record.restaurantName}</h2>
      <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{record.date} · {record.time}</p>
    </div>
  );
};

export default RecordHeader;
