"use client";

import { memo, useMemo } from "react";
import { UtensilsCrossed, Calendar, TrendingUp, Star, Flame } from "lucide-react";
import { cn } from "@/shared/utils";

interface DashboardProps {
  totalRecords: number;
  weeklyRecords: number;
  averageRating: number;
  streakDays: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StatCard = memo(({ title, value, icon, color, bgColor, trend, trendValue }: StatCardProps) => (
  <div
    className={cn(
      "relative overflow-hidden",
      "bg-[var(--color-background)]",
      "p-4 rounded-2xl",
      "border border-[var(--color-border)]",
      "transition-all duration-200",
      "hover:shadow-md hover:-translate-y-0.5",
      "active:scale-[0.98]"
    )}
  >
    {/* 배경 데코레이션 */}
    <div
      className="absolute -right-2 -top-2 w-16 h-16 rounded-full opacity-10"
      style={{ backgroundColor: color }}
    />

    <div className="relative z-10">
      {/* 아이콘 */}
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
          "transition-transform duration-200"
        )}
        style={{ backgroundColor: bgColor }}
      >
        <span style={{ color }}>{icon}</span>
      </div>

      {/* 값 */}
      <p className="text-2xl font-bold text-[var(--color-foreground)] mb-0.5">
        {value}
      </p>

      {/* 타이틀 & 트렌드 */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--color-muted-foreground)]">
          {title}
        </span>
        {trend && trendValue && (
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" && "text-green-500",
              trend === "down" && "text-red-500",
              trend === "neutral" && "text-[var(--color-muted-foreground)]"
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </span>
        )}
      </div>
    </div>
  </div>
));

StatCard.displayName = "StatCard";

const DashboardComponent = ({
  totalRecords,
  weeklyRecords,
  averageRating,
  streakDays,
}: DashboardProps) => {
  const stats = useMemo(() => [
    {
      title: "총 기록",
      value: totalRecords,
      icon: <UtensilsCrossed className="w-5 h-5" />,
      color: "var(--color-green-500)",
      bgColor: "var(--color-green-100)",
    },
    {
      title: "이번 주",
      value: weeklyRecords,
      icon: <Calendar className="w-5 h-5" />,
      color: "#3B82F6",
      bgColor: "#EFF6FF",
    },
    {
      title: "평균 평점",
      value: totalRecords > 0 ? averageRating.toFixed(1) : "-",
      icon: <Star className="w-5 h-5" />,
      color: "#F59E0B",
      bgColor: "#FFFBEB",
    },
    {
      title: "연속 기록",
      value: streakDays > 0 ? `${streakDays}일` : "-",
      icon: streakDays >= 7 ? <Flame className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />,
      color: streakDays >= 7 ? "#EF4444" : "#8B5CF6",
      bgColor: streakDays >= 7 ? "#FEF2F2" : "#F5F3FF",
    },
  ], [totalRecords, weeklyRecords, averageRating, streakDays]);

  return (
    <section aria-label="통계 대시보드">
      <div className="grid grid-cols-2 gap-3 w-full">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

DashboardComponent.displayName = "Dashboard";

export const Dashboard = memo(DashboardComponent);
