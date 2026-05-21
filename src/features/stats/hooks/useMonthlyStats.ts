"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/shared/lib/db";

export interface MonthlyData {
  month: string; // "2024-01" 형식
  label: string; // "1월" 형식
  totalSpend: number;
  recordCount: number;
  averageRating: number;
}

export interface CategoryData {
  category: string;
  count: number;
  totalSpend: number;
}

export const useMonthlyStats = (monthCount = 6) => {
  const data = useLiveQuery(async () => {
    const allRecords = await db.foodRecords.toArray();

    if (allRecords.length === 0) {
      return { monthly: [], categories: [], totalSpend: 0, avgRating: 0 };
    }

    // 최근 N개월 범위 계산
    const now = new Date();
    const months: string[] = [];
    for (let i = monthCount - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    }

    // 월별 집계
    const monthMap = new Map<string, { spend: number; count: number; ratingSum: number }>();
    months.forEach((m) => monthMap.set(m, { spend: 0, count: 0, ratingSum: 0 }));

    allRecords.forEach((record) => {
      const date = new Date(record.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const existing = monthMap.get(key);
      if (existing) {
        existing.spend += record.price ?? 0;
        existing.count += 1;
        existing.ratingSum += record.rating;
      }
    });

    const monthly: MonthlyData[] = months.map((m) => {
      const d = monthMap.get(m)!;
      const [, month] = m.split("-");
      return {
        month: m,
        label: `${parseInt(month)}월`,
        totalSpend: d.spend,
        recordCount: d.count,
        averageRating: d.count > 0 ? Math.round((d.ratingSum / d.count) * 10) / 10 : 0,
      };
    });

    // 카테고리 집계
    const categoryMap = new Map<string, { count: number; spend: number }>();
    allRecords.forEach((record) => {
      const cat = record.category || "기타";
      const existing = categoryMap.get(cat) ?? { count: 0, spend: 0 };
      existing.count += 1;
      existing.spend += record.price ?? 0;
      categoryMap.set(cat, existing);
    });

    const categories: CategoryData[] = Array.from(categoryMap.entries())
      .map(([category, v]) => ({ category, count: v.count, totalSpend: v.spend }))
      .sort((a, b) => b.count - a.count);

    const totalSpend = allRecords.reduce((sum, r) => sum + (r.price ?? 0), 0);
    const avgRating =
      allRecords.length > 0
        ? Math.round((allRecords.reduce((sum, r) => sum + r.rating, 0) / allRecords.length) * 10) / 10
        : 0;

    return { monthly, categories, totalSpend, avgRating };
  }, [monthCount]);

  return {
    monthly: data?.monthly ?? [],
    categories: data?.categories ?? [],
    totalSpend: data?.totalSpend ?? 0,
    avgRating: data?.avgRating ?? 0,
    isLoading: data === undefined,
  };
};
