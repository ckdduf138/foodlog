"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { LoadingSpinner } from "@/components/ui/common/atoms/LoadingSpinner";
import { RecordDetailContent } from "./RecordDetailContent";

interface RecordDetailContainerProps {
  recordId: number;
}

export const RecordDetailContainer = ({
  recordId,
}: RecordDetailContainerProps) => {
  const record = useLiveQuery(() => db.foodRecords.get(recordId), [recordId]);

  if (!record && record !== undefined) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">해당 기록을 찾을 수 없습니다.</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner message="기록을 불러오는 중입니다..." />
      </div>
    );
  }

  return <RecordDetailContent record={record} />;
};
