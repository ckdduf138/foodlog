"use client";

import { useParams, useRouter } from "next/navigation";
import { Suspense, lazy, useCallback, useMemo } from "react";
import { MainLayout, Header } from "@/shared/components";
import { FileText } from "lucide-react";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import useRecord from "@/features/records/hooks/useRecord";

// 코드 스플리팅: RecordDetail 컴포넌트를 지연 로딩
const RecordDetail = lazy(() => 
  import("@/features/records/components/RecordDetail/RecordDetail").then(mod => ({
    default: mod.RecordDetail
  }))
);

const RecordDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = useMemo(() => Number(params.id), [params.id]);

  const { record, loading, error, deleteRecord, reload } = useRecord(id);

  const handleEdit = useCallback(() => {
    router.push(`/records/new?edit=${id}`);
  }, [router, id]);

  const handleDelete = useCallback(async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const ok = await deleteRecord(id);
    if (ok) router.push("/records");
    else alert("삭제 실패");
  }, [deleteRecord, id, router]);

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
          <Suspense fallback={
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner message="컴포넌트 로딩 중..." />
            </div>
          }>
            <RecordDetail 
              record={record} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              onReload={reload}
            />
          </Suspense>
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
