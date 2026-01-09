"use client";

import React from "react";
import { cn } from "@/shared/utils";

interface SortButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SortButton: React.FC<SortButtonProps> = ({
  label,
  active,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "px-3 py-1.5 rounded-full",
        "text-xs font-medium",
        "transition-all duration-200",
        "touch-manipulation select-none",
        "active:scale-95",
        active
          ? "bg-[var(--color-green-100)] text-[var(--color-green-700)]"
          : "bg-transparent text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
      )}
    >
      {label}
    </button>
  );
};

export default SortButton;
