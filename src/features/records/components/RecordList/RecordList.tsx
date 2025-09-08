"use client";

import { FoodRecord } from "@/features/records/types";
import { RecordCard } from "@/features/records/components/RecordCard";
import { FileText } from "lucide-react";
import { EmptyState } from "@/shared/components";
import { useRouter } from "next/navigation";
import { SearchBar } from "./components";
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
    <div className="w-full space-y-4">
      {/* 검색 및 정렬 바 */}
      <SearchBar
        searchTerm={filterState.searchTerm}
        onSearchChange={setSearchTerm}
        currentSort={filterState.sortBy}
        onSortChange={setSortBy}
      />

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
