"use client";

import { UtensilsCrossed } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Header } from "@/components/ui/common/molecules/Header";
import { useFoodRecords } from "@/hooks";
import { useNavigation } from "@/hooks/useNavigation";
import { FoodRecord } from "@/types";
import { FoodRecordsList } from "@/components/ui/records/organisms";
import { DashboardStats } from "@/components/ui/home/organisms";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { records, loading, stats } = useFoodRecords();
  const { activeTab, changeTab } = useNavigation("home");
  const router = useRouter();

  const handleAddRecord = () => {
    router.push("/records/new");
  };

  const handleRecordClick = (record: FoodRecord) => {
    router.push(`/records/${record.id}`);
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
      <div className="px-4 py-6 space-y-3 sm:space-y-6 w-full flex flex-col items-stretch">
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
};

export default HomePage;
