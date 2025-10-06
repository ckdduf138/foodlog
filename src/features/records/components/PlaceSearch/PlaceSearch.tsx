"use client";

import { SearchInput } from "./components/SearchInput";
import type { PlaceSelect } from "@/features/records/types";
import usePlaceSearch from "./hooks/usePlaceSearch";
import { MapPin, Loader2 } from "lucide-react";

interface PlaceSearchProps {
  onPlaceSelect: (place: PlaceSelect) => void;
}

export function PlaceSearch({ onPlaceSelect }: PlaceSearchProps) {
  const {
    keyword,
    showDropdown,
    setShowDropdown,
    places,
    isLoading,
    error,
    isGettingLocation,
    handleKeywordChange,
    handleSearch,
    handleSearchResultSelect,
    handleGetCurrentLocation,
  } = usePlaceSearch({ onPlaceSelect });
  
  return (
    <div className="space-y-4">
      {/* 검색 에러 표시 */}
      {error && (
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-red-50 border border-red-200">
          <span className="text-sm text-red-800 whitespace-pre-line">{error}</span>
        </div>
      )}

      {/* 검색 입력 */}
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
      
      {/* 현재 위치 버튼 */}
      <button
        type="button"
        onClick={handleGetCurrentLocation}
        disabled={isGettingLocation}
        className="w-full px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
        }}
      >
        {isGettingLocation ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>위치 확인 중...</span>
          </>
        ) : (
          <>
            <MapPin className="w-5 h-5" />
            <span>현재 위치 가져오기</span>
          </>
        )}
      </button>
    </div>
  );
}
