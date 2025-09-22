"use client";

import { UtensilsCrossed } from "lucide-react";
import { MainLayout, Header } from "@/shared/components";
import { useNavigation } from "@/shared/hooks";
import { Dashboard } from "@/features/home";
import { RecordCard, useRecords } from "@/features/records";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { records } = useRecords();
  const { activeTab, changeTab } = useNavigation("home");
  const router = useRouter();

  // 간단한 통계 계산
  const totalRecords = records.length;
  const weeklyRecords = records.filter((record) => {
    const recordDate = new Date(record.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return recordDate >= weekAgo;
  }).length;
  const averageRating =
    records.length > 0
      ? records.reduce((sum, record) => sum + record.rating, 0) / records.length
      : 0;

  const handleRecordClick = (
    record: import("@/features/records/types").FoodRecord
  ) => {
    router.push(`/records/${record.id}`);
  };

  // 최근 3개 기록만 표시
  const recentRecords = records.slice(0, 3);

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
        <Dashboard
          totalRecords={totalRecords}
          weeklyRecords={weeklyRecords}
          averageRating={averageRating}
          streakDays={0}
        />

        {/* 최근 기록 */}
        {recentRecords.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
              최근 기록
            </h3>
            {recentRecords.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
                onClick={handleRecordClick}
                variant="compact"
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
