"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/shared/lib/db";
import { FoodRecord } from "@/features/records/types";

export const useRecords = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dexie의 useLiveQuery를 사용하여 실시간으로 데이터 가져오기
  const records =
    useLiveQuery(async () => {
      try {
        setLoading(true);
        const allRecords = await db.foodRecords
          .orderBy("createdAt")
          .reverse()
          .toArray();
        setError(null);
        return allRecords;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load records");
        return [];
      } finally {
        setLoading(false);
      }
    }, []) || [];

  const addRecord = async (
    record: Omit<FoodRecord, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const newRecord = {
        ...record,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const id = await db.foodRecords.add(newRecord);
      return { ...newRecord, id } as FoodRecord;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add record");
      throw err;
    }
  };

  const updateRecord = async (id: number, updates: Partial<FoodRecord>) => {
    try {
      await db.foodRecords.update(id, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update record");
      throw err;
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      await db.foodRecords.delete(id);
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
