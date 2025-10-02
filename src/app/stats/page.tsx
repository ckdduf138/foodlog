"use client";

import { MainLayout, Header } from "@/shared/components";
import { BarChart3 } from "lucide-react";

const StatsPage = () => {
  return (
    <MainLayout>
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
};

export default StatsPage;
