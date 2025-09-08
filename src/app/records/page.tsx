"use client";

import { MainLayout, Header } from "@/shared/components";
import { FileText } from "lucide-react";
import { useNavigation } from "@/shared/hooks";
import { RecordList, useRecords } from "@/features/records";

const RecordsPage = () => {
  const { activeTab, changeTab } = useNavigation("records");
  const { records, loading } = useRecords();

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="기록"
        subtitle="모든 기록을 확인하고 관리하세요"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full py-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-[var(--color-muted-foreground)]">
              로딩 중...
            </div>
          </div>
        ) : (
          <RecordList records={records} />
        )}
      </div>
    </MainLayout>
  );
};

export default RecordsPage;
