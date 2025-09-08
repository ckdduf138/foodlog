"use client";

import { MainLayout, Header } from "@/shared/components";
import { useNavigation } from "@/shared/hooks";
import { FileText } from "lucide-react";
import { useParams } from "next/navigation";

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
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">기록 상세</h2>
          <p className="mt-2 text-sm text-gray-500">기록 ID: {recordId}</p>
          <p className="mt-2 text-sm text-gray-500">
            기록 상세 기능을 구현 중입니다.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default RecordDetailPage;
