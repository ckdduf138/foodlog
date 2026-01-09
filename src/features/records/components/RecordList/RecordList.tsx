"use client";

import { useCallback, useMemo } from "react";
import { FoodRecord } from "@/features/records/types";
import { RecordCard } from "@/features/records/components/RecordCard";
import { FileText, UtensilsCrossed } from "lucide-react";
import { EmptyState } from "@/shared/components";
import { useRouter } from "next/navigation";
import { SearchBar } from "./components";
import SortButton from "./components/SortButton";
import { useRecordFilter } from "./hooks/useRecordFilter";
import { cn } from "@/shared/utils";

interface RecordListProps {
  records: FoodRecord[];
}

export const RecordList = ({ records }: RecordListProps) => {
  const router = useRouter();
  const { filterState, setSearchTerm, setSortBy, filteredAndSortedRecords } =
    useRecordFilter(records);

  const handleRecordClick = useCallback(
    (record: FoodRecord) => {
      router.push(`/records/${record.id}`);
    },
    [router]
  );

  const recordCount = useMemo(
    () => filteredAndSortedRecords.length,
    [filteredAndSortedRecords]
  );

  return (
    <div className="w-full space-y-4">
      {/* 검색 바 */}
      <SearchBar
        searchTerm={filterState.searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* 결과 수 & 정렬 */}
      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-[var(--color-muted-foreground)]">
          {filterState.searchTerm ? (
            <>
              <span className="font-medium text-[var(--color-foreground)]">
                {recordCount}
              </span>
              개의 검색 결과
            </>
          ) : (
            <>
              총{" "}
              <span className="font-medium text-[var(--color-foreground)]">
                {records.length}
              </span>
              개의 기록
            </>
          )}
        </span>

        <div className="inline-flex gap-1.5">
          <SortButton
            label="최신순"
            active={filterState.sortBy === "latest"}
            onClick={() => setSortBy("latest")}
          />
          <SortButton
            label="별점순"
            active={filterState.sortBy === "rating-high"}
            onClick={() => setSortBy("rating-high")}
          />
        </div>
      </div>

      {/* 기록 목록 */}
      {recordCount > 0 ? (
        <div className="space-y-3">
          {filteredAndSortedRecords.map((record, index) => (
            <div
              key={record.id}
              className={cn(
                "animate-slide-up",
                index < 10 && `[animation-delay:${index * 30}ms]`
              )}
            >
              <RecordCard record={record} onClick={handleRecordClick} />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-12">
          <EmptyState
            icon={
              filterState.searchTerm ? (
                <FileText className="w-12 h-12 text-[var(--color-muted-foreground)]" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[var(--color-green-100)] flex items-center justify-center">
                  <UtensilsCrossed className="w-10 h-10 text-[var(--color-green-500)]" />
                </div>
              )
            }
            title={
              filterState.searchTerm
                ? "검색 결과가 없어요"
                : "아직 기록이 없어요"
            }
            description={
              filterState.searchTerm
                ? "다른 키워드로 검색해보세요"
                : "첫 번째 맛있는 기억을 남겨보세요!"
            }
            action={
              !filterState.searchTerm
                ? {
                    label: "기록 추가하기",
                    onClick: () => router.push("/records/new"),
                  }
                : undefined
            }
          />
        </div>
      )}
    </div>
  );
};
