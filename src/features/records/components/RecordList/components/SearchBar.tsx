import React, { useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/shared/utils";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const handleClear = useCallback(() => {
    onSearchChange("");
  }, [onSearchChange]);

  return (
    <div
      className={cn(
        "relative flex items-center gap-3",
        "rounded-xl px-4 py-3",
        "bg-[var(--color-muted)]",
        "border border-transparent",
        "focus-within:border-[var(--color-primary)]",
        "focus-within:bg-[var(--color-background)]",
        "focus-within:shadow-sm",
        "transition-all duration-200"
      )}
    >
      <Search className="w-5 h-5 text-[var(--color-muted-foreground)] flex-shrink-0" />
      
      <input
        type="text"
        placeholder="음식, 식당 이름으로 검색..."
        className={cn(
          "flex-1 bg-transparent",
          "text-sm text-[var(--color-foreground)]",
          "placeholder:text-[var(--color-muted-foreground)]",
          "focus:outline-none",
          "min-w-0" // 키보드 올라올 때 너비 방지
        )}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "flex-shrink-0",
            "p-1.5 -mr-1.5 rounded-full",
            "text-[var(--color-muted-foreground)]",
            "hover:bg-[var(--color-border)]",
            "active:scale-90",
            "transition-all duration-150",
            "touch-manipulation"
          )}
          aria-label="검색어 지우기"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
