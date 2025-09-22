import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind CSS 클래스 병합 유틸리티
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// 일반 유틸리티
export const isClient = typeof window !== "undefined";

// 날짜 관련 유틸리티
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMinutes = Math.floor(
    (now.getTime() - targetDate.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일 전`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}주 전`;

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}개월 전`;
};

// 텍스트 관련 유틸리티
export const truncate = (s: string, length: number): string => {
  if (s.length <= length) {
    return s;
  }
  return s.slice(0, length) + "...";
};
