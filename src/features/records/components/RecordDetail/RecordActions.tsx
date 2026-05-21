"use client";
import React, { memo, useState } from "react";
import { Edit3, Trash2, Share2, Check, Copy } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";

interface RecordActionsProps {
  record: FoodRecord;
  onEdit: () => void;
  onDelete: () => void;
}

const RecordActionsComponent: React.FC<RecordActionsProps> = ({
  record,
  onEdit,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = `🍽 ${record.restaurantName} — ${record.foodName}\n⭐ ${record.rating}/5\n${record.review ? `"${record.review}"\n` : ""}${record.location.address ? `📍 ${record.location.address}` : ""}`.trim();

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: record.foodName, text });
        return;
      } catch {
        // 사용자가 취소하거나 실패하면 클립보드로 폴백
      }
    }

    // 클립보드 복사 폴백
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근 불가 환경에서는 조용히 무시
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* 공유 버튼 */}
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
        onClick={handleShare}
        aria-label="기록 공유"
        style={{
          backgroundColor: "var(--color-muted)",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-border)",
        }}
      >
        {copied ? (
          <>
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-green-500">복사됨</span>
          </>
        ) : (
          <>
            {typeof navigator !== "undefined" && "share" in navigator ? (
              <Share2 className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
            <span>공유</span>
          </>
        )}
      </button>

      {/* 편집 버튼 */}
      <button
        type="button"
        className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
        onClick={onEdit}
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
        }}
      >
        <Edit3 className="w-5 h-5" />
        <span>편집</span>
      </button>

      {/* 삭제 버튼 */}
      <button
        type="button"
        className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
        onClick={onDelete}
        style={{
          backgroundColor: "#FEE2E2",
          color: "#EF4444",
          border: "1px solid #FECACA",
        }}
      >
        <Trash2 className="w-5 h-5" />
        <span>삭제</span>
      </button>
    </div>
  );
};

RecordActionsComponent.displayName = "RecordActions";

export const RecordActions = memo(RecordActionsComponent);
