"use client";

import React from "react";
import type { FoodRecord } from "@/features/records/types";
import RecordHeader from "@/features/records/components/RecordDetail/RecordHeader";
import RecordMedia from "@/features/records/components/RecordDetail/RecordMedia";
import RecordReview from "@/features/records/components/RecordDetail/RecordReview";
import RecordLocation from "@/features/records/components/RecordDetail/RecordLocation";
import RecordActions from "@/features/records/components/RecordDetail/RecordActions";

interface RecordDetailProps {
  record: FoodRecord;
  onEdit: () => void;
  onDelete: () => void;
}

const RecordDetail: React.FC<RecordDetailProps> = ({ record, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--color-secondary)', border: '1px solid var(--color-border)' }}>
        {/* Card wrapper */}
        <div className="flex items-start justify-between">
          <RecordHeader record={record} />
          <RecordActions onEdit={onEdit} onDelete={onDelete} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2 space-y-4">
            <RecordMedia record={record} />
            <RecordReview record={record} />
          </div>

          <aside className="space-y-4">
            <RecordLocation record={record} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;
