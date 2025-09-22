import { useEffect, useState, useCallback } from "react";
import { db } from "@/shared/lib/db";
import type { FoodRecord } from "@/features/records/types";

export const useRecord = (id: number | null | undefined) => {
  const [record, setRecord] = useState<FoodRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id || !Number.isFinite(Number(id))) {
      setError("유효하지 않은 ID입니다.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const rec = await db.foodRecords.get(Number(id));
      if (!rec) {
        setRecord(null);
        setError("해당 기록을 찾을 수 없습니다.");
      } else {
        setRecord(rec as FoodRecord);
        setError(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "불러오기 실패");
      setRecord(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const deleteRecord = useCallback(async (recordId: number) => {
    try {
      await db.foodRecords.delete(recordId);
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  return { record, loading, error, reload: load, deleteRecord } as const;
};

export default useRecord;
