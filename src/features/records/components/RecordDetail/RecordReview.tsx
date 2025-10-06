import React, { memo } from "react";
import { UtensilsCrossed, MessageSquare, CreditCard } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";

interface RecordReviewProps {
  record: FoodRecord;
}

const RecordReviewComponent: React.FC<RecordReviewProps> = ({ record }) => {
  return (
    <div className="space-y-5">
      {/* 메뉴 정보 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'var(--color-muted)' }}
          >
            <UtensilsCrossed className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
            메뉴
          </h3>
        </div>
        
        <p className="text-xl font-semibold pl-1" style={{ color: 'var(--color-foreground)' }}>
          {record.foodName}
        </p>

        {/* 카테고리 */}
        {record.category && (
          <span 
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'white',
            }}
          >
            {record.category}
          </span>
        )}
      </div>

      {/* 한줄평 */}
      {record.review && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--color-muted)' }}
            >
              <MessageSquare className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
              한줄평
            </h3>
          </div>
          
          <p 
            className="text-base leading-relaxed pl-1"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            {record.review}
          </p>
        </div>
      )}

      {/* 가격 정보 */}
      {record.price && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--color-muted)' }}
            >
              <CreditCard className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h4 className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
              가격
            </h4>
          </div>
          <p className="text-2xl font-bold pl-1" style={{ color: 'var(--color-primary)' }}>
            {record.price.toLocaleString()}원
          </p>
        </div>
      )}
    </div>
  );
};

RecordReviewComponent.displayName = 'RecordReview';

export const RecordReview = memo(RecordReviewComponent, (prevProps, nextProps) => {
  return (
    prevProps.record.foodName === nextProps.record.foodName &&
    prevProps.record.category === nextProps.record.category &&
    prevProps.record.review === nextProps.record.review &&
    prevProps.record.price === nextProps.record.price
  );
});
