"use client";

import { Suspense } from "react";
import { MainLayout, Header, RecordListSkeleton } from "@/shared/components";
import { FileText } from "lucide-react";
import { RecordList, useRecords } from "@/features/records";

// 기록 목록 컴포넌트 분리
const RecordListContent = () => {
  const { records, loading } = useRecords();

  if (loading) {
    return <RecordListSkeleton count={5} />;
  }

  return <RecordList records={records} />;
};

const RecordsPage = () => {
  return (
    <MainLayout showFab={true}>
      <Header
        title="기록"
        subtitle={`나의 맛있는 기억들`}
        icon={<FileText className="w-5 h-5" />}
        size="md"
      />

      <div className="w-full mt-2">
        <Suspense fallback={<RecordListSkeleton count={5} />}>
          <RecordListContent />
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default RecordsPage;
