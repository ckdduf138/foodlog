"use client";

import { SearchInput } from "./components/SearchInput";
import type { PlaceSelect } from "@/features/records/types";
import type { PlaceSearchResult } from "./types";
import usePlaceSearch from "./hooks/usePlaceSearch";

interface PlaceSearchProps {
  onPlaceSelect: (place: PlaceSelect) => void;
}

export function PlaceSearch({ onPlaceSelect }: PlaceSearchProps) {
  const {
    keyword,
    setKeyword,
    showDropdown,
    setShowDropdown,
    places,
    isLoading,
    error,
    handleKeywordChange,
    handleSearch,
    handleSearchResultSelect,
  } = usePlaceSearch({ onPlaceSelect });
  return (
    <div className="space-y-4">
      {/* 검색 에러 표시 */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 border border-red-200">
          <span className="text-sm text-red-800">{error}</span>
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            keyword={keyword}
            showDropdown={showDropdown}
            places={places}
            isLoading={isLoading}
            onKeywordChange={handleKeywordChange}
            onSearch={handleSearch}
            onPlaceSelect={handleSearchResultSelect}
            onDropdownToggle={setShowDropdown}
          />
        </div>
      </div>
    </div>
  );
}
