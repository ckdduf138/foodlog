"use client";

import React from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { PlaceSearchResult } from "../types";
import { formatDistance } from "../utils";

interface SearchInputProps {
  keyword: string;
  showDropdown: boolean;
  places: PlaceSearchResult[];
  isLoading?: boolean;
  onKeywordChange: (keyword: string) => void;
  onSearch: (keyword: string) => void;
  onPlaceSelect: (place: PlaceSearchResult) => void;
  onDropdownToggle: (show: boolean) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  keyword,
  showDropdown,
  places,
  isLoading = false,
  onKeywordChange,
  onSearch,
  onPlaceSelect,
  onDropdownToggle,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onKeywordChange(value);

    if (value.trim()) {
      onSearch(value);
    } else {
      onDropdownToggle(false);
    }
  };

  const handlePlaceClick = (place: PlaceSearchResult) => {
    onPlaceSelect(place);
    onDropdownToggle(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="삼겹살 전문점"
          className="w-full p-3 pr-10 border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
            color: "var(--color-foreground)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--color-green-500)";
            e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors disabled:opacity-50"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </form>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-1 border rounded-xl shadow-lg z-50 max-h-[50vh] sm:max-h-60 overflow-y-auto"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <Loader2
                className="w-5 h-5 animate-spin mx-auto mb-2"
                style={{ color: "var(--color-muted-foreground)" }}
              />
            </div>
          ) : places.length > 0 ? (
            <>
              {places.map((place, index) => (
                <div
                  key={index}
                  className="p-3 cursor-pointer transition-colors border-b last:border-b-0"
                  style={{ borderColor: "var(--color-border)" }}
                  onClick={() => handlePlaceClick(place)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div
                        className="font-semibold text-base"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {place.place_name}
                      </div>
                      <div
                        className="text-sm mt-0.5"
                        style={{ color: "var(--color-muted-foreground)" }}
                      >
                        {place.address_name || place.road_address_name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {place.category_name && (
                          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
                            {place.category_name.split(" > ").pop()}
                          </div>
                        )}
                        {/* phone removed per request */}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2">
                      {place.distance && (
                        <div className="flex items-center text-xs text-blue-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {parseInt(place.distance) > 1000
                            ? `${(parseInt(place.distance) / 1000).toFixed(
                                1
                              )}km`
                            : `${place.distance}m`}
                        </div>
                      )}
                      {place.calculatedDistance && (
                        <div className="flex items-center text-xs text-green-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {formatDistance(place.calculatedDistance)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="p-4 text-center">
              <div
                className="text-sm"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                검색 결과가 없습니다
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
