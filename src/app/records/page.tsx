"use client";

import { MainLayout, Header, LoadingSpinner } from "@/shared/components";
import { FileText } from "lucide-react";
import { RecordList, useRecords } from "@/features/records";

const RecordsPage = () => {
  const { records, loading } = useRecords();

  return (
    <MainLayout>
      <Header
        title="기록"
        subtitle="모든 기록을 확인하고 관리하세요"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner message="기록 불러오는 중..." />
          </div>
        ) : (
          <RecordList records={records} />
        )}
      </div>
    </MainLayout>
  );
};

export default RecordsPage;
