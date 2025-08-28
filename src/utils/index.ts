// 유틸리티 함수들
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind CSS 클래스 병합 유틸리티
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 날짜 관련 유틸리티
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "오후" : "오전";
  const displayHour = hour % 12 || 12;
  return `${ampm} ${displayHour}:${minutes}`;
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

// 별점 관련 유틸리티
export const getRatingText = (rating: number): string => {
  const ratingTexts = {
    1: "별로예요",
    2: "그저 그래요",
    3: "괜찮아요",
    4: "맛있어요",
    5: "정말 맛있어요!",
  };
  return ratingTexts[rating as keyof typeof ratingTexts] || "";
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 4) return "text-green-600";
  if (rating >= 3) return "text-yellow-600";
  if (rating >= 2) return "text-orange-600";
  return "text-red-600";
};

// 이미지 관련 유틸리티
export const compressImage = (
  file: File,
  maxWidth = 800,
  quality = 0.8
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    img.src = URL.createObjectURL(file);
  });
};

export const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = src;
  });
};

// 검색 관련 유틸리티
export const highlightSearchTerm = (
  text: string,
  searchTerm: string
): string => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

export const createSearchIndex = (records: any[]): Map<string, any[]> => {
  const index = new Map<string, any[]>();

  records.forEach((record) => {
    const searchableText = [
      record.foodName,
      record.restaurantName,
      record.location.address,
      record.review,
      ...(record.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    const words = searchableText.split(/\s+/);
    words.forEach((word) => {
      if (word.length > 1) {
        if (!index.has(word)) {
          index.set(word, []);
        }
        index.get(word)!.push(record);
      }
    });
  });

  return index;
};

// 로컬 스토리지 유틸리티
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      if (typeof window === "undefined") return defaultValue;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Storage error:", error);
    }
  },

  remove: (key: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Storage error:", error);
    }
  },
};

// 디바운스 함수
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 쓰로틀 함수
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 배열 유틸리티
export const groupBy = <T, K extends keyof any>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const group = key(item);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

// 통계 계산 유틸리티
export const calculateAverage = (numbers: number[]): number => {
  return numbers.length > 0
    ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length
    : 0;
};

export const calculatePercentage = (value: number, total: number): number => {
  return total > 0 ? Math.round((value / total) * 100) : 0;
};
