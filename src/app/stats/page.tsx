"use client";

import { MainLayout, Header } from "@/shared/components";
import { BarChart3, TrendingUp, Utensils, Star, Receipt } from "lucide-react";
import { useMonthlyStats } from "@/features/stats/hooks/useMonthlyStats";
import { MonthlySpendChart } from "@/features/stats/components/MonthlySpendChart";
import { StatCard } from "@/features/stats/components/StatCard";
import { Skeleton } from "@/shared/components/ui/Skeleton";

const StatsSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl p-4 border border-[var(--color-border)] bg-[var(--color-background)]">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
    <div className="rounded-2xl p-4 border border-[var(--color-border)] bg-[var(--color-background)]">
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton variant="rounded" className="h-52 w-full" />
    </div>
  </div>
);

const StatsPage = () => {
  const { monthly, categories, totalSpend, avgRating, isLoading } =
    useMonthlyStats(6);

  const currentMonthData = monthly[monthly.length - 1];
  const prevMonthData = monthly[monthly.length - 2];

  const spendTrend =
    currentMonthData && prevMonthData && prevMonthData.totalSpend > 0
      ? Math.round(
          ((currentMonthData.totalSpend - prevMonthData.totalSpend) /
            prevMonthData.totalSpend) *
            100
        )
      : null;

  const totalRecords = monthly.reduce((sum, m) => sum + m.recordCount, 0);

  return (
    <MainLayout>
      <Header
        title="통계"
        subtitle="식습관 통계와 인사이트"
        icon={<BarChart3 className="w-6 h-6" />}
      />

      <div className="w-full space-y-5 mt-2">
        {isLoading ? (
          <StatsSkeleton />
        ) : (
          <>
            {/* 요약 카드 */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="총 지출"
                value={`₩${(totalSpend / 10000).toFixed(1)}만`}
                sub="전체 기간"
                icon={<Receipt className="w-4 h-4" />}
                highlight
              />
              <StatCard
                label="이번 달 지출"
                value={
                  currentMonthData?.totalSpend
                    ? `₩${currentMonthData.totalSpend.toLocaleString()}`
                    : "₩0"
                }
                sub={
                  spendTrend !== null
                    ? spendTrend > 0
                      ? `지난달 대비 +${spendTrend}%`
                      : spendTrend < 0
                      ? `지난달 대비 ${spendTrend}%`
                      : "지난달과 동일"
                    : "기록 없음"
                }
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <StatCard
                label="총 기록 수"
                value={`${totalRecords}개`}
                sub="6개월 기준"
                icon={<Utensils className="w-4 h-4" />}
              />
              <StatCard
                label="평균 별점"
                value={avgRating > 0 ? `${avgRating}점` : "-"}
                sub="전체 평균"
                icon={<Star className="w-4 h-4" />}
              />
            </div>

            {/* 월별 지출 바차트 */}
            <div className="rounded-2xl p-4 border border-[var(--color-border)] bg-[var(--color-background)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[var(--color-foreground)]">
                  월별 지출
                </h2>
                <span className="text-xs text-[var(--color-muted-foreground)]">
                  최근 6개월
                </span>
              </div>
              {monthly.some((m) => m.totalSpend > 0) ? (
                <MonthlySpendChart data={monthly} />
              ) : (
                <div className="h-52 flex items-center justify-center">
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    지출 기록이 없어요
                  </p>
                </div>
              )}
            </div>

            {/* 카테고리 분포 */}
            {categories.length > 0 && (
              <div className="rounded-2xl p-4 border border-[var(--color-border)] bg-[var(--color-background)]">
                <h2 className="text-base font-bold text-[var(--color-foreground)] mb-4">
                  카테고리별 기록
                </h2>
                <div className="space-y-3">
                  {categories.slice(0, 5).map((cat, i) => {
                    const maxCount = categories[0].count;
                    const pct = Math.round((cat.count / maxCount) * 100);
                    return (
                      <div key={cat.category}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[var(--color-foreground)]">
                            {cat.category}
                          </span>
                          <span className="text-xs text-[var(--color-muted-foreground)]">
                            {cat.count}회 · ₩{cat.totalSpend.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-[var(--color-muted)] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              backgroundColor:
                                i === 0
                                  ? "var(--color-primary)"
                                  : "var(--color-green-300)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 월별 방문 횟수 */}
            <div className="rounded-2xl p-4 border border-[var(--color-border)] bg-[var(--color-background)]">
              <h2 className="text-base font-bold text-[var(--color-foreground)] mb-4">
                월별 방문 횟수
              </h2>
              <div className="space-y-2">
                {[...monthly].reverse().map((m) => (
                  <div key={m.month} className="flex items-center gap-3">
                    <span className="text-xs text-[var(--color-muted-foreground)] w-8 text-right">
                      {m.label}
                    </span>
                    <div className="flex-1 h-6 rounded-md bg-[var(--color-muted)] overflow-hidden">
                      <div
                        className="h-full rounded-md flex items-center px-2 transition-all duration-700"
                        style={{
                          width: `${
                            m.recordCount === 0
                              ? 0
                              : Math.max(
                                  8,
                                  (m.recordCount /
                                    Math.max(...monthly.map((x) => x.recordCount), 1)) *
                                    100
                                )
                          }%`,
                          backgroundColor: "var(--color-green-400)",
                        }}
                      >
                        {m.recordCount > 0 && (
                          <span className="text-xs text-white font-medium">
                            {m.recordCount}
                          </span>
                        )}
                      </div>
                    </div>
                    {m.recordCount === 0 && (
                      <span className="text-xs text-[var(--color-muted-foreground)]">
                        0
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default StatsPage;
