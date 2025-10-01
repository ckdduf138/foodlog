"use client";

import { useParams, useRouter } from "next/navigation";
import { MainLayout, Header } from "@/shared/components";
import { FileText } from "lucide-react";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import useRecord from "@/features/records/hooks/useRecord";
import RecordDetail from "@/features/records/components/RecordDetail/RecordDetail";

const RecordDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { record, loading, error, deleteRecord, reload } = useRecord(id);

  const handleEdit = () => {
    router.push(`/records/new?edit=${id}`);
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const ok = await deleteRecord(id);
    if (ok) router.push("/records");
    else alert("삭제 실패");
  };

  return (
    <MainLayout>
      <Header
        title="기록 상세"
        subtitle="음식 기록 정보"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner message="기록 불러오는 중..." />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-[var(--color-destructive)]">오류 발생</h2>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{error}</p>
          </div>
        ) : record ? (
          <RecordDetail 
            record={record} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            onReload={reload}
          />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-[var(--color-foreground)]">기록 없음</h2>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">해당 기록을 찾을 수 없습니다.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default RecordDetailPage;
