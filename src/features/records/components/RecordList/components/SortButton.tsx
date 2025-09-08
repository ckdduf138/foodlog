import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { SortOption, SortConfig } from "../types";

interface SortButtonProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: SortConfig[] = [
  { value: "latest", label: "최신순" },
  {
    value: "rating-high",
    label: "별점 높은순",
  },
];

export const SortButton: React.FC<SortButtonProps> = ({
  currentSort,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortSelect = (sortOption: SortOption) => {
    onSortChange(sortOption);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded-md transition-colors flex items-center gap-1"
        style={{ color: "var(--color-muted-foreground)" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-36 rounded-lg shadow-lg border z-50"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              className="w-full px-3 py-2 text-left flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors"
              style={{
                color:
                  option.value === currentSort
                    ? "var(--color-green-600)"
                    : "var(--color-foreground)",
              }}
              onClick={() => handleSortSelect(option.value)}
            >
              {option.icon}
              <span className="text-sm">{option.label}</span>
              {option.value === currentSort && (
                <div
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--color-green-500)" }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
