import React from "react";
import { UtensilsCrossed, MessageSquare, CreditCard } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";

interface RecordReviewProps {
  record: FoodRecord;
}

export const RecordReview: React.FC<RecordReviewProps> = ({ record }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* 메뉴 정보 */}
      <div>
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
            메뉴
          </h3>
        </div>
        
        {/* 메뉴 이름 */}
        <p className="text-base font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
          {record.foodName}
        </p>

        {/* 카테고리 */}
        {record.category && (
          <span 
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: 'var(--color-muted)', 
              color: 'var(--color-muted-foreground)' 
            }}
          >
            {record.category}
          </span>
        )}
      </div>

      {/* 한줄평 */}
      <div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
            한줄평
          </h3>
        </div>
        
        {/* 한줄평 */}
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-foreground)' }}>
          {record.review || "한줄평이 없습니다."}
        </p>
      </div>

      {/* 가격 정보 */}
      <div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <h4 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
            가격
          </h4>
        </div>
        <p className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
          {record.price ? `${record.price.toLocaleString()}원` : "가격 미등록"}
        </p>
      </div>
    </div>
  );
};
