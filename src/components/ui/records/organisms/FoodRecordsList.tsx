import { FoodRecord } from "@/types";
import { useRouter } from "next/navigation";
import { FoodRecordCard } from "@/components/ui/records/molecules/FoodRecordCard";
import { UtensilsCrossed } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/common/atoms/LoadingSpinner";
import { EmptyState } from "@/components/ui/common/molecules/EmptyState";

interface FoodRecordsListProps {
  records: FoodRecord[];
  loading: boolean;
  onRecordClick?: (record: FoodRecord) => void;
  onAddRecord?: () => void;
  onViewAll?: () => void;
  variant?: "default" | "compact";
  title?: string;
}

export const FoodRecordsList = ({
  records,
  loading,
  onRecordClick,
  onAddRecord,
  onViewAll,
  variant = "default",
  title = "최신 기록",
}: FoodRecordsListProps) => {
  const router = useRouter();

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      router.push("/records");
    }
  };

  if (loading) {
    return (
      <div className="bg-[var(--color-background)] rounded-xl shadow-sm border border-[var(--color-border)] p-6 w-full">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
          {title}
        </h2>
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner message="기록을 불러오는 중..." />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-background)] rounded-xl shadow-sm border border-[var(--color-border)] p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
          {title}
        </h2>
        {records.length > 0 && (
          <button
            onClick={handleViewAll}
            className="text-sm text-[var(--color-green-600)] hover:text-[var(--color-green-700)] font-medium"
          >
            전체 보기
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <EmptyState
          icon={<UtensilsCrossed className="w-12 h-12 text-gray-400" />}
          title="첫 번째 기록을 남겨보세요!"
          description="맛있게 먹은 음식을 기록하고 추억을 쌓아보세요."
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
