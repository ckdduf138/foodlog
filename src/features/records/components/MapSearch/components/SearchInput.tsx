"use client";

import React from "react";
import { Search, MapPin } from "lucide-react";
import { PlaceSearchResult } from "../types";
import { formatDistance } from "../utils";

interface SearchInputProps {
  keyword: string;
  showDropdown: boolean;
  places: PlaceSearchResult[];
  onKeywordChange: (keyword: string) => void;
  onSearch: (keyword: string) => void;
  onPlaceSelect: (place: PlaceSearchResult) => void;
  onDropdownToggle: (show: boolean) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  keyword,
  showDropdown,
  places,
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
    <div className="relative mb-4">
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
          onBlur={(e) => {
            setTimeout(() => {
              e.target.style.borderColor = "var(--color-border)";
              e.target.style.boxShadow = "none";
              onDropdownToggle(false);
            }, 200);
          }}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Search Results Dropdown */}
      {showDropdown && places.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          {places.map((place, index) => (
            <div
              key={index}
              className="p-3 cursor-pointer transition-colors border-b last:border-b-0"
              style={{ borderColor: "var(--color-border)" }}
              onClick={() => handlePlaceClick(place)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div
                    className="font-semibold"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {place.place_name}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {place.address_name}
                  </div>
                  {place.category_name && (
                    <div
                      className="text-xs mt-1"
                      style={{ color: "var(--color-muted-foreground)" }}
                    >
                      {place.category_name}
                    </div>
                  )}
                </div>
                {place.calculatedDistance && (
                  <div className="flex items-center text-xs text-green-600 ml-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {formatDistance(place.calculatedDistance)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
