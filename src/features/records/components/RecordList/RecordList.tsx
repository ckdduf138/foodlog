"use client";

import { FoodRecord } from "@/features/records/types";
import { RecordCard } from "@/features/records/components/RecordCard";
import { FileText } from "lucide-react";
import { EmptyState } from "@/shared/components";
import { useRouter } from "next/navigation";
import { SearchBar } from "./components";
import SortButton from "./components/SortButton";
import { useRecordFilter } from "./hooks/useRecordFilter";

interface RecordListProps {
  records: FoodRecord[];
}

export const RecordList = ({ records }: RecordListProps) => {
  const router = useRouter();
  const { filterState, setSearchTerm, setSortBy, filteredAndSortedRecords } =
    useRecordFilter(records);

  const handleRecordClick = (record: FoodRecord) => {
    router.push(`/records/${record.id}`);
  };

  return (
    <div className="w-full space-y-2">
      {/* 검색 및 정렬 바 */}
      <SearchBar
        searchTerm={filterState.searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* 정렬 토글 (우측) */}
      <div className="flex px-2 justify-end">
        <div className="inline-flex space-x-2">
          <SortButton
            label="최신순"
            active={filterState.sortBy === "latest"}
            onClick={() => setSortBy("latest")}
          />

          <SortButton
            label="별점 높은순"
            active={filterState.sortBy === "rating-high"}
            onClick={() => setSortBy("rating-high")}
          />
        </div>
      </div>

      {/* 기록 목록 */}
      {filteredAndSortedRecords.length > 0 ? (
        <div className="space-y-3">
          {filteredAndSortedRecords.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onClick={handleRecordClick}
            />
          ))}
        </div>
      ) : (
        <div className="pt-16">
          <EmptyState
            icon={
              <FileText
                className="w-12 h-12"
                style={{ color: "var(--color-muted-foreground)" }}
              />
            }
            title={
              filterState.searchTerm
                ? "검색 결과가 없습니다"
                : "아직 기록이 없습니다"
            }
            description={
              filterState.searchTerm
                ? "다른 검색어로 다시 시도해보세요."
                : "첫 번째 음식 기록을 추가해보세요!"
            }
          />
        </div>
      )}
    </div>
  );
};
