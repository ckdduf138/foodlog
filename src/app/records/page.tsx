"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Header } from "@/components/ui/common/molecules/Header";
import { FileText } from "lucide-react";
import { useNavigation } from "@/hooks/useNavigation";
import { RecordsPageContent } from "@/components/ui/records/organisms";

export default function RecordsPage() {
  const { activeTab, changeTab } = useNavigation("records");

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="기록"
        subtitle="모든 기록을 확인하고 관리하세요"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full py-4">
        <RecordsPageContent />
      </div>
    </MainLayout>
  );
}
