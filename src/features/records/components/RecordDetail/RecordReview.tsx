import React from "react";
import type { FoodRecord } from "@/features/records/types";

const RecordReview: React.FC<{ record: FoodRecord }> = ({ record }) => {
  return (
    <div style={{ color: 'var(--color-foreground)' }}>
      <h3 className="font-semibold">메뉴</h3>
      <p style={{ color: 'var(--color-muted-foreground)' }}>{record.foodName} {record.category ? `· ${record.category}` : null}</p>

      <h3 className="mt-4 font-semibold">한줄평</h3>
      <p style={{ color: 'var(--color-foreground)' }}>{record.review}</p>
    </div>
  );
};

export default RecordReview;
