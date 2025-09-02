"use client";

import { useState } from "react";
import { FoodRecord } from "@/types";
import { FoodRecordCard } from "@/components/ui/records/molecules/FoodRecordCard";
import { FileText, Search, ListFilter } from "lucide-react";
import { EmptyState } from "@/components/ui/common/molecules/EmptyState";
import { useRouter } from "next/navigation";

interface AllRecordsContainerProps {
  records: FoodRecord[];
}

export const AllRecordsContainer = ({ records }: AllRecordsContainerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // TODO: 필터링 로직 추가

  const handleRecordClick = (record: FoodRecord) => {
    router.push(`/records/${record.id}`);
  };

  const filteredRecords = records.filter(
    (record) =>
      record.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      {/* 검색 및 필터 바 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="음식 이름, 식당 이름으로 검색"
          className="flex-1 bg-transparent focus:outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="p-2 rounded-md hover:bg-gray-100">
          <ListFilter className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* 기록 목록 */}
      {filteredRecords.length > 0 ? (
        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <FoodRecordCard
              key={record.id}
              record={record}
              onClick={handleRecordClick}
            />
          ))}
        </div>
      ) : (
        <div className="pt-16">
          <EmptyState
            icon={<FileText className="w-12 h-12 text-gray-400" />}
            title="검색 결과가 없습니다"
            description="다른 검색어로 다시 시도해보세요."
          />
        </div>
      )}
    </div>
  );
};
