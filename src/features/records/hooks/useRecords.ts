"use client";

import { useState, useEffect } from "react";
import { FoodRecord } from "@/features/records/types";

// 임시 데이터 (실제로는 IndexedDB에서 가져올 예정)
const mockRecords: FoodRecord[] = [];

export const useRecords = () => {
  const [records, setRecords] = useState<FoodRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);
        // TODO: 실제 데이터베이스에서 로드
        setRecords(mockRecords);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

  const addRecord = async (
    record: Omit<FoodRecord, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const newRecord: FoodRecord = {
        ...record,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setRecords((prev) => [newRecord, ...prev]);
      return newRecord;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add record");
      throw err;
    }
  };

  const updateRecord = async (id: number, updates: Partial<FoodRecord>) => {
    try {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === id
            ? { ...record, ...updates, updatedAt: new Date() }
            : record
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update record");
      throw err;
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      setRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete record");
      throw err;
    }
  };

  const getRecord = (id: number) => {
    return records.find((record) => record.id === id);
  };

  return {
    records,
    loading,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecord,
  };
};
