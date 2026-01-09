"use client";

import { memo, useCallback, useMemo } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import { StarRating } from "@/shared/components";
import { FoodRecord } from "@/features/records/types";
import { useRouter } from "next/navigation";
import { cn, getRelativeTime, truncate } from "@/shared/utils";

interface RecordCardProps {
  record: FoodRecord;
  onClick?: (record: FoodRecord) => void;
  variant?: "default" | "compact" | "minimal";
}

const RecordCardComponent = ({
  record,
  onClick,
  variant = "default",
}: RecordCardProps) => {
  const router = useRouter();
  const isCompact = variant === "compact";
  const isMinimal = variant === "minimal";

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(record);
    } else {
      router.push(`/records/${record.id}`);
    }
  }, [onClick, record, router]);

  const formattedPrice = useMemo(
    () => record.price?.toLocaleString() || "0",
    [record.price]
  );

  const relativeTime = useMemo(
    () => getRelativeTime(record.createdAt || record.date),
    [record.createdAt, record.date]
  );

  const truncatedAddress = useMemo(
    () => truncate(record.location.address || "", isCompact ? 20 : 28),
    [record.location.address, isCompact]
  );

  // Minimal variant - 리스트 아이템 스타일 (Uber Eats 스타일)
  if (isMinimal) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 p-3",
          "bg-[var(--color-background)]",
          "active:bg-[var(--color-muted)]",
          "transition-colors duration-150",
          "cursor-pointer select-none touch-manipulation"
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        {/* 이미지 */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--color-muted)]">
          {record.photo ? (
            <Image
              src={record.photo}
              alt={record.foodName}
              fill
              sizes="56px"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-muted-foreground)]">
              🍽️
            </div>
          )}
        </div>

        {/* 정보 */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-[var(--color-foreground)] truncate">
            {record.restaurantName}
          </h4>
          <p className="text-xs text-[var(--color-muted-foreground)] truncate">
            {record.foodName}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={record.rating} size="xs" />
            <span className="text-xs text-[var(--color-muted-foreground)]">
              · {relativeTime}
            </span>
          </div>
        </div>

        {/* 가격 & 화살표 */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-[var(--color-green-600)]">
            ₩{formattedPrice}
          </span>
          <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
        </div>
      </div>
    );
  }

  // Default & Compact variants - 카드 스타일
  return (
    <div
      className={cn(
        "bg-[var(--color-background)] rounded-2xl",
        "border border-[var(--color-border)]",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-200 ease-out",
        "cursor-pointer select-none touch-manipulation",
        "active:scale-[0.98]",
        isCompact ? "p-3" : "p-4"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* 상단: 음식명, 식당명 + 우측 별점, 사진 */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-bold text-[var(--color-foreground)] leading-tight",
              isCompact ? "text-sm" : "text-base"
            )}
          >
            {record.restaurantName}
          </h3>
          <p
            className={cn(
              "text-[var(--color-muted-foreground)] font-medium mt-0.5",
              isCompact ? "text-xs" : "text-sm"
            )}
          >
            {record.foodName}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={record.rating} size="sm" />
            <span className="text-xs text-[var(--color-muted-foreground)]">
              {relativeTime}
            </span>
          </div>
        </div>

        {/* 우측: 사진 */}
        {record.photo && (
          <div className={cn(
            "rounded-xl overflow-hidden flex-shrink-0",
            "border border-[var(--color-border)]",
            "bg-[var(--color-muted)]",
            isCompact ? "w-14 h-14" : "w-16 h-16"
          )}>
            <Image
              src={record.photo}
              alt={record.foodName}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* 하단: 위치 & 가격 */}
      <div
        className={cn(
          "flex items-center justify-between pt-3 mt-3",
          "border-t border-[var(--color-border)]"
        )}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1 text-[var(--color-muted-foreground)]">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-xs font-medium truncate">{truncatedAddress}</span>
        </div>
        <div className="flex-shrink-0">
          <span
            className={cn(
              "font-bold text-[var(--color-green-600)]",
              isCompact ? "text-sm" : "text-base"
            )}
          >
            ₩{formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

RecordCardComponent.displayName = "RecordCard";

export const RecordCard = memo(RecordCardComponent, (prev, next) => {
  return (
    prev.record.id === next.record.id &&
    prev.record.photo === next.record.photo &&
    prev.record.rating === next.record.rating &&
    prev.record.restaurantName === next.record.restaurantName &&
    prev.record.foodName === next.record.foodName &&
    prev.record.price === next.record.price &&
    prev.variant === next.variant
  );
});
