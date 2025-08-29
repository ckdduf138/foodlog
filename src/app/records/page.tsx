"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/ui/molecules";
import { FileText } from "lucide-react";

export default function RecordsPage() {
  const { activeTab, changeTab } = useNavigation("records");

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="기록"
        subtitle="모든 기록을 확인하고 관리하세요"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full text-center py-12">
        <h2 className="text-xl font-semibold">기록</h2>
        <p className="mt-2 text-sm text-gray-500">
          여기서 모든 기록을 확인하고 관리하세요.
        </p>
      </div>
    </MainLayout>
  );
}
