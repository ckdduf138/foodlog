import React from "react";
import { UtensilsCrossed, MessageSquare, CircleDollarSign } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";
import { EditableField } from "./EditableField";
import { EditablePrice } from "./EditablePrice";

interface RecordReviewProps {
  record: FoodRecord;
  onUpdateFoodName: (name: string) => Promise<void>;
  onUpdateCategory: (category: string) => Promise<void>;
  onUpdateReview: (review: string) => Promise<void>;
  onUpdatePrice?: (price: number | undefined) => Promise<void>;
}

const RecordReview: React.FC<RecordReviewProps> = ({ 
  record,
  onUpdateFoodName,
  onUpdateCategory,
  onUpdateReview,
  onUpdatePrice
}) => {
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
        
        {/* 메뉴 이름 - 편집 가능 */}
        <div className="mb-2">
          <EditableField
            value={record.foodName}
            onSave={onUpdateFoodName}
            placeholder="메뉴 이름"
            className="text-base font-medium"
          />
        </div>

        {/* 카테고리 - 편집 가능 */}
        {record.category && (
          <div className="inline-block">
            <EditableField
              value={record.category}
              onSave={onUpdateCategory}
              placeholder="카테고리"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
              editClassName="text-xs"
            />
          </div>
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
        
        {/* 한줄평 - 편집 가능 */}
        <EditableField
          value={record.review}
          onSave={onUpdateReview}
          placeholder="한줄평을 작성해주세요"
          multiline
          className="text-base leading-relaxed"
        />
      </div>

      {/* 가격 정보 - 편집 가능 */}
      <div>
        <div className="flex items-center gap-2">
          <CircleDollarSign className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <h4 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
            가격
          </h4>
        </div>
        {onUpdatePrice ? (
          <EditablePrice value={record.price} onSave={onUpdatePrice} />
        ) : (
          <p 
            className="text-lg font-bold" 
          >
            {record.price ? `${record.price.toLocaleString()}원` : "가격 미등록"}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecordReview;
