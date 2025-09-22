"use client";

import { useState } from "react";
import { FoodRecord } from "@/types";
import {
  Calendar,
  Utensils,
  Star,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { formatDate } from "@/utils/common";

interface RecordDetailContentProps {
  record: FoodRecord;
  onEdit: () => void;
  onDelete: () => void;
}

export const RecordDetailContent = ({
  record,
  onEdit,
  onDelete,
}: RecordDetailContentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 디버그 로그 추가
  console.log(
    "RecordDetailContent - record.photo:",
    !!record.photo,
    record.photo?.substring(0, 50) + "..."
  );

  return (
    <div className="max-w-md mx-auto">
      {/* 인스타그램 스타일 헤더 */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
            <Utensils className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--color-foreground)" }}
            >
              {record.restaurantName}
            </h2>
            <p
              className="text-xs"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              {record.location.address}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full transition-colors"
            style={{ color: "var(--color-muted-foreground)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 mt-1 w-32 rounded-lg shadow-lg border z-10"
              style={{
                backgroundColor: "var(--color-background)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm transition-colors"
                  style={{ color: "var(--color-foreground)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  수정
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 이미지 영역 */}
      {record.photo ? (
        <div className="aspect-square">
          <img
            src={record.photo}
            alt="Food photo"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ) : (
        <div
          className="aspect-square flex items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--color-muted)" }}
        >
          <div className="text-center">
            <Utensils
              className="w-12 h-12 mx-auto mb-2"
              style={{ color: "var(--color-muted-foreground)" }}
            />
            <p
              className="text-sm"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              사진이 없습니다
            </p>
          </div>
        </div>
      )}

      {/* 콘텐츠 영역 */}
      <div className="p-4">
        {/* 음식명과 별점 */}
        <div className="mb-3">
          <h1
            className="font-bold text-xl mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            {record.foodName}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(record.rating)
                      ? "text-yellow-400 fill-current"
                      : i < record.rating
                      ? "text-yellow-400 fill-current opacity-50"
                      : ""
                  }`}
                  style={
                    i >= Math.floor(record.rating) && i >= record.rating
                      ? { color: "var(--color-muted-foreground)" }
                      : {}
                  }
                />
              ))}
              <span
                className="text-sm font-medium ml-2"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {record.rating.toFixed(1)}
              </span>
            </div>

            {/* 가격 */}
            {record.price && (
              <span
                className="text-lg font-bold"
                style={{ color: "var(--color-foreground)" }}
              >
                ₩{record.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* 후기 */}
        {record.review && (
          <div className="mb-4">
            <p
              className="leading-relaxed"
              style={{ color: "var(--color-foreground)" }}
            >
              {record.review}
            </p>
          </div>
        )}

        {/* 방문 날짜 */}
        <div
          className="flex items-center text-sm mb-3"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {formatDate(record.date)} {record.time}
          </span>
        </div>

        {/* 태그 */}
        {record.tags && record.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {record.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: "var(--color-muted)",
                  color: "var(--color-muted-foreground)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
