"use client";

import { useMemo, useCallback, Suspense } from "react";
import { UtensilsCrossed, ChevronRight } from "lucide-react";
import Link from "next/link";
import { MainLayout, Header, EmptyState, DashboardSkeleton, RecordListSkeleton } from "@/shared/components";
import { Dashboard } from "@/features/home";
import { RecordCard, useRecords } from "@/features/records";
import { useRouter } from "next/navigation";
import { calculateStreakDays } from "@/features/home/utils/statsHelpers";
import { cn } from "@/shared/utils";
import type { FoodRecord } from "@/features/records/types";

// 통계 계산 최적화
const useStats = (records: FoodRecord[]) => {
  return useMemo(() => {
    const totalRecords = records.length;
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weeklyRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= weekAgo;
    }).length;
    
    const averageRating =
      totalRecords > 0
        ? records.reduce((sum, record) => sum + record.rating, 0) / totalRecords
        : 0;
    
    const streakDays = calculateStreakDays(records.map((record) => record.date));

    return { totalRecords, weeklyRecords, averageRating, streakDays };
  }, [records]);
};

// 섹션 헤더 컴포넌트
const SectionHeader = ({ title, href }: { title: string; href?: string }) => (
  <div className="flex items-center justify-between mb-3">
    <h2 className="text-lg font-bold text-[var(--color-foreground)]">
      {title}
    </h2>
    {href && (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-1",
          "text-sm font-medium text-[var(--color-primary)]",
          "hover:text-[var(--color-green-700)]",
          "transition-colors"
        )}
      >
        전체보기
        <ChevronRight className="w-4 h-4" />
      </Link>
    )}
  </div>
);

// 메인 컨텐츠 컴포넌트
const HomeContent = () => {
  const { records, loading } = useRecords();
  const router = useRouter();
  const stats = useStats(records);

  const handleRecordClick = useCallback(
    (record: FoodRecord) => {
      router.push(`/records/${record.id}`);
    },
    [router]
  );

  // 최근 3개 기록만 표시
  const recentRecords = useMemo(() => records.slice(0, 3), [records]);

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <DashboardSkeleton />
        <div>
          <SectionHeader title="최근 기록" />
          <RecordListSkeleton count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 통계 대시보드 */}
      <section>
        <Dashboard {...stats} />
      </section>

      {/* 최근 기록 */}
      <section>
        <SectionHeader
          title="최근 기록"
          href={records.length > 3 ? "/records" : undefined}
        />
        
        {recentRecords.length > 0 ? (
          <div className="space-y-3">
            {recentRecords.map((record, index) => (
              <div
                key={record.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RecordCard
                  record={record}
                  onClick={handleRecordClick}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={
              <div className="w-20 h-20 rounded-full bg-[var(--color-green-100)] flex items-center justify-center">
                <UtensilsCrossed className="w-10 h-10 text-[var(--color-green-500)]" />
              </div>
            }
            title="아직 기록이 없어요"
            description="첫 번째 맛있는 기억을 남겨보세요!"
            action={{
              label: "첫 기록 추가하기",
              onClick: () => router.push("/records/new"),
            }}
          />
        )}
      </section>
    </div>
  );
};

const HomePage = () => {
  return (
    <MainLayout>
      {/* 헤더 */}
      <Header
        title="FoodLog"
        subtitle="나만의 음식 기록"
        icon={<UtensilsCrossed className="w-6 h-6" />}
        size="lg"
      />

      {/* 메인 컨텐츠 */}
      <Suspense
        fallback={
          <div className="space-y-6">
            <DashboardSkeleton />
            <RecordListSkeleton count={3} />
          </div>
        }
      >
        <HomeContent />
      </Suspense>
    </MainLayout>
  );
};

export default HomePage;
