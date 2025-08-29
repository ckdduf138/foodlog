// 커스텀 훅들 (비즈니스 로직 분리)
import { useState, useEffect, useMemo } from "react";
import { db, FoodRecord } from "@/lib/db";

// 음식 기록 관리 훅
export const useFoodRecords = () => {
  const [records, setRecords] = useState<FoodRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = async (limit?: number) => {
    try {
      setLoading(true);
      setError(null);

      let query = db.foodRecords.orderBy("createdAt").reverse();
      if (limit) {
        query = query.limit(limit);
      }

      const data = await query.toArray();
      setRecords(data);
    } catch (err) {
      console.error("Error loading records:", err);
      setError("기록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (
    record: Omit<FoodRecord, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const now = new Date();
      const newRecord = {
        ...record,
        createdAt: now,
        updatedAt: now,
      };

      await db.foodRecords.add(newRecord);
      await loadRecords(5); // 최근 5개 다시 로드
    } catch (err) {
      console.error("Error adding record:", err);
      setError("기록 추가 중 오류가 발생했습니다.");
    }
  };

  const updateRecord = async (id: number, updates: Partial<FoodRecord>) => {
    try {
      await db.foodRecords.update(id, {
        ...updates,
        updatedAt: new Date(),
      });
      await loadRecords(5);
    } catch (err) {
      console.error("Error updating record:", err);
      setError("기록 수정 중 오류가 발생했습니다.");
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      await db.foodRecords.delete(id);
      await loadRecords(5);
    } catch (err) {
      console.error("Error deleting record:", err);
      setError("기록 삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    loadRecords(5); // 초기 로드 시 최근 5개만
  }, []);

  // 통계 계산
  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const monthlyRecords = records.filter(
      (record) => new Date(record.date).getMonth() === currentMonth
    );

    const averageRating =
      records.length > 0
        ? records.reduce((sum, record) => sum + record.rating, 0) /
          records.length
        : 0;

    // 가장 자주 방문한 레스토랑
    const restaurantCounts = records.reduce((acc, record) => {
      acc[record.restaurantName] = (acc[record.restaurantName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const favoriteRestaurant = Object.entries(restaurantCounts).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0];

    return {
      totalRecords: records.length,
      monthlyRecords: monthlyRecords.length,
      weeklyRecords: records.filter((record) => {
        const recordDate = new Date(record.date);
        const diff =
          (Date.now() - recordDate.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      }).length,
      averageRating,
      favoriteRestaurant,
      streakDays: (() => {
        // 연속 기록 계산 (오늘 포함)
        const dateSet = new Set(records.map((r) => r.date));
        const format = (d: Date) => d.toISOString().slice(0, 10);
        let count = 0;
        const cursor = new Date();
        while (true) {
          const key = format(cursor);
          if (dateSet.has(key)) {
            count += 1;
            cursor.setDate(cursor.getDate() - 1);
          } else {
            break;
          }
        }
        return count;
      })(),
    };
  }, [records]);

  return {
    records,
    loading,
    error,
    stats,
    actions: {
      loadRecords,
      addRecord,
      updateRecord,
      deleteRecord,
    },
  };
};

// Note: client-only navigation hook lives in src/hooks/useNavigation.tsx
// Do not re-export it here to avoid importing a client module from a server module.

// 로컬 스토리지 훅 (설정 등)
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};
