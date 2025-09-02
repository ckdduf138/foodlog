"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/ui/common/molecules/Header";
import { FileText } from "lucide-react";
import { useParams } from "next/navigation";
import { RecordDetailContainer } from "@/components/ui/records/organisms/RecordDetailContainer";

const RecordDetailPage = () => {
  const { activeTab, changeTab } = useNavigation("records");
  const params = useParams();
  const recordId = parseInt(params.id as string);

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="기록"
        subtitle="음식 기록 상세 정보"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full py-4">
        <RecordDetailContainer recordId={recordId} />
      </div>
    </MainLayout>
  );
};

export default RecordDetailPage;
