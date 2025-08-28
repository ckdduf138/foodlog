"use client";

import { UtensilsCrossed, Plus } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Header } from "@/components/ui/molecules";
import {
  DashboardStats,
  FoodRecordsList,
  QuickActions,
} from "@/components/ui/organisms";
import { useFoodRecords, useNavigation } from "@/hooks";

export default function Home() {
  const { records, loading, stats } = useFoodRecords();
  const { activeTab, changeTab } = useNavigation("home");

  const handleAddRecord = () => {
    // TODO: 기록 추가 페이지로 이동
    console.log("기록 추가 페이지로 이동");
  };

  const handleRecordClick = (record: any) => {
    // TODO: 기록 상세 페이지로 이동
    console.log("기록 상세:", record);
  };

  const handleSearch = () => {
    // TODO: 검색 페이지로 이동
    console.log("검색 페이지로 이동");
  };

  const handleViewStats = () => {
    // TODO: 통계 페이지로 이동
    changeTab("stats");
  };

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      {/* 헤더 */}
      <Header
        title="FoodLog"
        subtitle="나만의 음식 기록"
        icon={<UtensilsCrossed className="w-8 h-8" />}
        action={{
          label: "기록 추가",
          onClick: handleAddRecord,
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      {/* 메인 컨텐츠 */}
      <div className="px-4 py-6 space-y-6">
        {/* 통계 대시보드 */}
        <DashboardStats
          totalRecords={stats.totalRecords}
          monthlyRecords={stats.monthlyRecords}
          averageRating={stats.averageRating}
          favoriteCategory={stats.favoriteRestaurant}
        />

        {/* 빠른 실행 */}
        <QuickActions
          onAddRecord={handleAddRecord}
          onSearch={handleSearch}
          onViewStats={handleViewStats}
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
