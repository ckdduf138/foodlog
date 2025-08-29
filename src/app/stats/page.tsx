"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigation } from "@/hooks";
import { Header } from "@/components/ui/molecules";
import { BarChart3 } from "lucide-react";

export default function StatsPage() {
  const { activeTab, changeTab } = useNavigation("stats");

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="통계"
        subtitle="식습관 통계와 인사이트"
        icon={<BarChart3 className="w-6 h-6" />}
      />

      <div className="w-full text-center py-12">
        <h2 className="text-xl font-semibold">통계</h2>
        <p className="mt-2 text-sm text-gray-500">
          식습관 통계와 인사이트를 제공합니다.
        </p>
      </div>
    </MainLayout>
  );
}
