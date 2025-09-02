import { FoodRecord } from "@/types";

import { FoodRecordCard } from "@/components/ui/records/molecules/FoodRecordCard";
import { EmptyState } from "@/components/ui/molecules/EmptyState";
import { LoadingSpinner } from "@/components/ui/atoms";
import { UtensilsCrossed } from "lucide-react";

interface FoodRecordsListProps {
  records: FoodRecord[];
  loading: boolean;
  onRecordClick?: (record: FoodRecord) => void;
  onAddRecord?: () => void;
  variant?: "default" | "compact";
  title?: string;
}

export const FoodRecordsList = ({
  records,
  loading,
  onRecordClick,
  onAddRecord,
  variant = "default",
  title = "최신 기록",
}: FoodRecordsListProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
        <LoadingSpinner message="기록을 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {records.length > 0 && (
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
            전체 보기
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <EmptyState
          icon={<UtensilsCrossed className="w-16 h-16" />}
          title="첫 번째 기록을 남겨보세요!"
          description="맛있게 먹은 음식을 기록해보세요."
          action={
            onAddRecord
              ? {
                  label: "기록 추가",
                  onClick: onAddRecord,
                }
              : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <FoodRecordCard
              key={record.id}
              record={record}
              onClick={onRecordClick}
              variant={variant}
            />
          ))}
        </div>
      )}
    </div>
  );
};
