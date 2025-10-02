"use client";

import React from "react";
import type { FoodRecord } from "@/features/records/types";
import { useRecordUpdate } from "@/features/records/hooks/useRecordUpdate";
import { RecordHeader } from "@/features/records/components/RecordDetail/RecordHeader";
import { RecordMedia } from "@/features/records/components/RecordDetail/RecordMedia";
import { RecordReview } from "@/features/records/components/RecordDetail/RecordReview";
import { RecordLocation } from "@/features/records/components/RecordDetail/RecordLocation";
import { RecordActions } from "@/features/records/components/RecordDetail/RecordActions";

interface RecordDetailProps {
  record: FoodRecord;
  onEdit: () => void;
  onDelete: () => void;
  onReload?: () => void;
}

export const RecordDetail: React.FC<RecordDetailProps> = ({ record, onEdit, onDelete, onReload }) => {
  const { updatePhoto } = useRecordUpdate(record, onReload);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* 메인 콘텐츠 카드 */}
      <div 
        className="rounded-2xl p-5 shadow-sm"
        style={{ 
          backgroundColor: 'var(--color-background)', 
          border: '1px solid var(--color-border)' 
        }}
      >
        {/* 헤더와 액션 버튼 */}
        <div className="flex items-start justify-between mb-6">
          <RecordHeader record={record} />
          <RecordActions onEdit={onEdit} onDelete={onDelete} />
        </div>

        {/* 사진 섹션 */}
        <div className="mb-6">
          <RecordMedia record={record} onUpdatePhoto={updatePhoto} />
        </div>

        {/* 리뷰와 위치 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 리뷰 섹션 */}
          <div className="md:col-span-2">
            <RecordReview record={record} />
          </div>

          {/* 사이드바 - 위치 및 가격 */}
          <aside className="md:col-span-1">
            <RecordLocation record={record} />
          </aside>
        </div>
      </div>
    </div>
  );
};
