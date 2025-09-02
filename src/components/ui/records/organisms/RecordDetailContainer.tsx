"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { LoadingSpinner } from "@/components/ui/common/atoms/LoadingSpinner";
import { RecordDetailContent } from "./RecordDetailContent";
import { FoodRecord } from "@/types";

interface RecordDetailContainerProps {
  recordId: number;
}

export const RecordDetailContainer = ({
  recordId,
}: RecordDetailContainerProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const record = useLiveQuery(
    () => db.foodRecords.get(recordId),
    [recordId]
  ) as FoodRecord | undefined | null;

  const handleDelete = async () => {
    if (!record) return;

    const confirmed = window.confirm("이 기록을 정말 삭제하시겠습니까?");

    if (confirmed) {
      setIsDeleting(true);
      try {
        await db.foodRecords.delete(recordId);
        router.push("/records");
      } catch (error) {
        console.error("기록 삭제 실패:", error);
        alert("기록을 삭제하는 중 오류가 발생했습니다.");
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = () => {
    router.push(`/records/${recordId}/edit`);
  };

  if (isDeleting) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
        <p className="ml-2">기록을 삭제하는 중입니다...</p>
      </div>
    );
  }

  if (record === undefined) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (record === null) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">해당 기록을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <RecordDetailContent
      record={record}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
};
