import { useState, useMemo } from "react";
import { FoodRecord } from "@/features/records/types";
import { SortOption, RecordFilterState } from "../types";

export const useRecordFilter = (records: FoodRecord[]) => {
  const [filterState, setFilterState] = useState<RecordFilterState>({
    searchTerm: "",
    sortBy: "latest",
  });

  const setSearchTerm = (searchTerm: string) => {
    setFilterState((prev) => ({ ...prev, searchTerm }));
  };

  const setSortBy = (sortBy: SortOption) => {
    setFilterState((prev) => ({ ...prev, sortBy }));
  };

  const filteredAndSortedRecords = useMemo(() => {
    // 1. 검색 필터링
    let filtered = records.filter(
      (record) =>
        record.foodName
          .toLowerCase()
          .includes(filterState.searchTerm.toLowerCase()) ||
        record.restaurantName
          .toLowerCase()
          .includes(filterState.searchTerm.toLowerCase())
    );

    // 2. 정렬
    switch (filterState.sortBy) {
      case "latest":
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "rating-high":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [records, filterState.searchTerm, filterState.sortBy]);

  return {
    filterState,
    setSearchTerm,
    setSortBy,
    filteredAndSortedRecords,
  };
};
