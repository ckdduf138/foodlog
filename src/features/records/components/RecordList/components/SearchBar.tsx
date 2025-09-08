import React from "react";
import { Search } from "lucide-react";
import { SortButton } from "./SortButton";
import { SortOption } from "../types";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  currentSort,
  onSortChange,
}) => {
  return (
    <div
      className="rounded-xl shadow-sm border px-2 flex items-center gap-2"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <Search
        className="w-5 h-5"
        style={{ color: "var(--color-muted-foreground)" }}
      />
      <input
        type="text"
        placeholder="음식 이름, 식당 이름으로 검색"
        className="flex-1 bg-transparent focus:outline-none text-sm py-3"
        style={{ color: "var(--color-foreground)" }}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <SortButton currentSort={currentSort} onSortChange={onSortChange} />
    </div>
  );
};
