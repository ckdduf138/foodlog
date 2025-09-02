"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { LoadingSpinner } from "@/components/ui/common/atoms/LoadingSpinner";
import { AllRecordsContainer } from "./AllRecordsContainer";

export const RecordsPageContent = () => {
  const records = useLiveQuery(
    () => db.foodRecords.orderBy("createdAt").reverse().toArray(),
    []
  );

  if (!records) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner message="기록을 불러오는 중입니다..." />
      </div>
    );
  }

  return <AllRecordsContainer records={records} />;
};
