import { useEffect, useState, useCallback, useRef } from "react";
import { db } from "@/shared/lib/db";
import type { FoodRecord } from "@/features/records/types";

export const useRecord = (id: number | null | undefined) => {
  const [record, setRecord] = useState<FoodRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    if (!id || !Number.isFinite(Number(id))) {
      setError("유효하지 않은 ID입니다.");
      setLoading(false);
      return;
    }

    // 이전 요청 취소
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      // IndexedDB 작업을 비동기로 처리
      const rec = await db.foodRecords.get(Number(id));
      
      // 요청이 취소되었는지 확인
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      if (!rec) {
        setRecord(null);
        setError("해당 기록을 찾을 수 없습니다.");
      } else {
        setRecord(rec as FoodRecord);
        setError(null);
      }
    } catch (e) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      setError(e instanceof Error ? e.message : "불러오기 실패");
      setRecord(null);
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    load();

    // cleanup: 컴포넌트 언마운트 시 요청 취소
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [load]);

  const deleteRecord = useCallback(async (recordId: number) => {
    try {
      await db.foodRecords.delete(recordId);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { record, loading, error, reload: load, deleteRecord } as const;
};

export default useRecord;
