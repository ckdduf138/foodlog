"use client";

import React, { memo } from "react";
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

const RecordDetailComponent: React.FC<RecordDetailProps> = ({ record, onEdit, onDelete, onReload }) => {
  const { updatePhoto } = useRecordUpdate(record, onReload);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* 메인 콘텐츠 카드 */}
      <div 
        className="rounded-3xl overflow-hidden shadow-lg"
        style={{ 
          backgroundColor: 'var(--color-background)', 
          border: '1px solid var(--color-border)' 
        }}
      >
        {/* 내용 섹션 */}
        <div className="p-6 space-y-6">
          {/* 헤더 섹션 */}
          <div>
            <RecordHeader record={record} />
          </div>

          {/* 구분선 */}
          <div 
            className="h-px" 
            style={{ backgroundColor: 'var(--color-border)' }}
          />

          {/* 사진 섹션 - 메뉴 위에 배치 */}
          <div className="relative">
            <RecordMedia record={record} onUpdatePhoto={updatePhoto} />
          </div>

          {/* 리뷰 섹션 */}
          <div>
            <RecordReview record={record} />
          </div>

          {/* 위치 정보 */}
          {(record.location.placeName || record.location.address) && (
            <>
              <div 
                className="h-px" 
                style={{ backgroundColor: 'var(--color-border)' }}
              />
              <div>
                <RecordLocation record={record} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 하단 액션 버튼 - 고정 위치 */}
      <div className="flex justify-center">
        <RecordActions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};

RecordDetailComponent.displayName = 'RecordDetail';

export const RecordDetail = memo(RecordDetailComponent, (prevProps, nextProps) => {
  // 커스텀 비교 함수로 불필요한 리렌더링 방지
  return (
    prevProps.record.id === nextProps.record.id &&
    prevProps.record.photo === nextProps.record.photo &&
    prevProps.record.rating === nextProps.record.rating &&
    prevProps.record.restaurantName === nextProps.record.restaurantName
  );
});
