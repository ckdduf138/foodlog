import { ReactNode } from "react";
import { cn } from "@/shared/utils";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon?: ReactNode;
  highlight?: boolean;
  className?: string;
}

export const StatCard = ({
  label,
  value,
  sub,
  icon,
  highlight = false,
  className,
}: StatCardProps) => (
  <div
    className={cn(
      "rounded-2xl p-4 border border-[var(--color-border)]",
      highlight
        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
        : "bg-[var(--color-background)]",
      className
    )}
  >
    <div className="flex items-center justify-between mb-2">
      <span
        className={cn(
          "text-xs font-medium",
          highlight
            ? "text-[var(--color-primary-foreground)]/80"
            : "text-[var(--color-muted-foreground)]"
        )}
      >
        {label}
      </span>
      {icon && <span className="opacity-70">{icon}</span>}
    </div>
    <p
      className={cn(
        "text-2xl font-bold leading-none",
        highlight ? "text-[var(--color-primary-foreground)]" : "text-[var(--color-foreground)]"
      )}
    >
      {value}
    </p>
    {sub && (
      <p
        className={cn(
          "text-xs mt-1",
          highlight
            ? "text-[var(--color-primary-foreground)]/70"
            : "text-[var(--color-muted-foreground)]"
        )}
      >
        {sub}
      </p>
    )}
  </div>
);
