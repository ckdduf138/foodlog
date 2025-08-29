"use client";

import { UtensilsCrossed } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Header } from "@/components/ui/molecules";
import { useFoodRecords, useNavigation } from "@/hooks";
import { FoodRecord } from "@/lib/db";
import { DashboardStats, FoodRecordsList } from "@/components/ui/organisms";

export default function HomePage() {
  const { records, loading, stats } = useFoodRecords();
  const { activeTab, changeTab } = useNavigation("home");

  const handleAddRecord = () => {
    // TODO: 기록 추가 페이지로 이동
    console.log("기록 추가 페이지로 이동");
  };

  const handleRecordClick = (record: FoodRecord) => {
    // TODO: 기록 상세 페이지로 이동
    console.log("기록 상세:", record);
  };

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      {/* 헤더 */}
      <Header
        title="FoodLog"
        subtitle="나만의 음식 기록"
        icon={<UtensilsCrossed className="w-8 h-8" />}
      />

      {/* 메인 컨텐츠 */}
      <div className="px-0 sm:px-0 py-2 sm:py-4 space-y-3 sm:space-y-6 w-full flex flex-col items-stretch">
        {/* 통계 대시보드 */}
        <DashboardStats
          totalRecords={stats.totalRecords}
          weeklyRecords={stats.weeklyRecords}
          averageRating={stats.averageRating}
          streakDays={stats.streakDays}
        />

        {/* 최근 기록 */}
        <FoodRecordsList
          records={records}
          loading={loading}
          onRecordClick={handleRecordClick}
          onAddRecord={handleAddRecord}
          title="최근 기록"
        />
      </div>
    </MainLayout>
  );
}
