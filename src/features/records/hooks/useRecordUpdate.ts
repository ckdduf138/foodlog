import { useCallback } from "react";
import { db } from "@/shared/lib/db";
import type { FoodRecord } from "@/features/records/types";

export const useRecordUpdate = (record: FoodRecord | null, onUpdate?: () => void) => {
  const updatePhoto = useCallback(
    async (photo: string | File | undefined) => {
      if (!record?.id) {
        throw new Error("기록 ID가 없습니다.");
      }

      try {
        await db.foodRecords.update(record.id, {
          photo: photo,
        } as Partial<FoodRecord>);

        if (onUpdate) {
          onUpdate();
        }
      } catch {
        throw new Error("사진 업데이트 실패");
      }
    },
    [record, onUpdate]
  );

  return {
    updatePhoto,
  };
};
