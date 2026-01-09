"use client";

import { cn } from "@/shared/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  sticky?: boolean;
}

export const Header = ({
  title,
  subtitle,
  icon,
  children,
  size = "md",
  action,
  sticky = false,
}: HeaderProps) => {
  const sizeStyles = {
    sm: {
      container: "py-3",
      title: "text-lg",
      subtitle: "text-xs",
      icon: "w-6 h-6",
    },
    md: {
      container: "py-4",
      title: "text-xl",
      subtitle: "text-sm",
      icon: "w-7 h-7",
    },
    lg: {
      container: "py-5",
      title: "text-2xl",
      subtitle: "text-sm",
      icon: "w-8 h-8",
    },
  };

  const styles = sizeStyles[size];

  return (
    <header
      className={cn(
        "w-full",
        styles.container,
        sticky && "sticky top-0 z-40 bg-[var(--color-background)]/95 backdrop-blur-sm"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {/* 좌측: 아이콘 + 타이틀 */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {icon && (
            <div
              className={cn(
                "flex-shrink-0 p-2 rounded-xl",
                "bg-[var(--color-green-100)]",
                "text-[var(--color-green-600)]"
              )}
            >
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1
              className={cn(
                styles.title,
                "font-bold text-[var(--color-foreground)] truncate"
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  styles.subtitle,
                  "text-[var(--color-muted-foreground)] truncate mt-0.5"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 우측: 액션 버튼 또는 children */}
        {(action || children) && (
          <div className="flex-shrink-0">
            {action ? (
              <button
                onClick={action.onClick}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl",
                  "text-sm font-medium",
                  "bg-[var(--color-primary)] text-white",
                  "hover:bg-[var(--color-green-700)]",
                  "transition-colors duration-200",
                  "touch-manipulation"
                )}
              >
                {action.icon}
                <span className="hidden sm:inline">{action.label}</span>
              </button>
            ) : (
              children
            )}
          </div>
        )}
      </div>
    </header>
  );
};
