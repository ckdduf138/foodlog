"use client";

import { useState, useEffect } from "react";
import { Statistics } from "@/features/home/types";

export const useStats = () => {
  const [stats, setStats] = useState<Statistics>({
    totalRecords: 0,
    monthlyRecords: 0,
    averageRating: 0,
    favoriteRestaurant: undefined,
    topCategories: [],
    ratingDistribution: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        // TODO: 실제 데이터베이스에서 통계 계산
        // 임시로 빈 통계 설정
        setStats({
          totalRecords: 0,
          monthlyRecords: 0,
          averageRating: 0,
          favoriteRestaurant: undefined,
          topCategories: [],
          ratingDistribution: [],
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const refreshStats = async () => {
    // TODO: 통계 새로고침 로직
  };

  return {
    stats,
    loading,
    refreshStats,
  };
};
