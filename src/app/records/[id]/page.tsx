"use client";

import { useParams, useRouter } from "next/navigation";
import { MainLayout, Header } from "@/shared/components";
import { useNavigation } from "@/shared/hooks";
import { FileText } from "lucide-react";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import useRecord from "@/features/records/hooks/useRecord";
import RecordDetail from "@/features/records/components/RecordDetail/RecordDetail";

const RecordDetailPage = () => {
  const { activeTab, changeTab } = useNavigation("records");
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { record, loading, error, deleteRecord } = useRecord(id);

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
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="기록"
        subtitle="음식 기록 상세 정보"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full py-4">
        {loading ? (
          <LoadingSpinner message="기록 불러오는 중..." />
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">오류</h2>
            <p className="mt-2 text-sm text-red-500">{error}</p>
          </div>
        ) : record ? (
          <RecordDetail record={record} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">기록 없음</h2>
            <p className="mt-2 text-sm text-muted-foreground">해당 기록을 찾을 수 없습니다.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default RecordDetailPage;
