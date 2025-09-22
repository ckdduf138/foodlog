import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
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
      {searchTerm ? (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="p-1 rounded-full hover:bg-[rgba(0,0,0,0.04)]"
          aria-label="검색어 지우기"
        >
          <X className="w-4 h-4" style={{ color: "var(--color-muted-foreground)" }} />
        </button>
      ) : null}
    </div>
  );
};
