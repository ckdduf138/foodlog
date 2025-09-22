"use client";

import React from "react";

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
      className={`text-sm font-medium transition-colors duration-150 ${
        active ? "text-[var(--color-green-500)]" : "text-[var(--color-muted-foreground)]"
      }`}
    >
      {label}
    </button>
  );
};

export default SortButton;
