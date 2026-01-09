"use client";

import { cn } from "@/shared/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export const Skeleton = ({
  className,
  variant = "text",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) => {
  const baseStyles = "bg-[var(--color-muted)]";
  
  const variantStyles = {
    text: "rounded-md h-4",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-xl",
  };

  const animationStyles = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
};

// Skeleton 조합 컴포넌트들
export const RecordCardSkeleton = () => (
  <div className="bg-[var(--color-background)] rounded-2xl p-4 border border-[var(--color-border)]">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="h-5 w-3/4" />
        <Skeleton variant="text" className="h-4 w-1/2" />
        <Skeleton variant="text" className="h-3 w-1/3" />
      </div>
      <div className="flex flex-col items-end gap-2">
        <Skeleton variant="rounded" className="h-4 w-20" />
        <Skeleton variant="rounded" className="w-16 h-16" />
      </div>
    </div>
    <div className="flex justify-between items-center pt-3 border-t border-[var(--color-border)]">
      <Skeleton variant="text" className="h-3 w-2/5" />
      <Skeleton variant="text" className="h-4 w-16" />
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="grid grid-cols-2 gap-3 w-full">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)]"
      >
        <div className="flex items-center justify-between mb-3">
          <Skeleton variant="text" className="h-3 w-16" />
          <Skeleton variant="circular" className="w-5 h-5" />
        </div>
        <Skeleton variant="text" className="h-7 w-12" />
      </div>
    ))}
  </div>
);

export const RecordListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <RecordCardSkeleton key={i} />
    ))}
  </div>
);
