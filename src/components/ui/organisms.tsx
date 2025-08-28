// Atomic Design Pattern - Organisms (molecules와 atoms를 조합한 복잡한 컴포넌트들)

import { FoodRecord } from "@/lib/db";
import { FoodRecordCard, EmptyState } from "./molecules";
import { LoadingSpinner } from "./atoms";
import { UtensilsCrossed, Plus } from "lucide-react";

// 음식 기록 리스트 컴포넌트
interface FoodRecordsListProps {
  records: FoodRecord[];
  loading: boolean;
  onRecordClick?: (record: FoodRecord) => void;
  onAddRecord?: () => void;
  variant?: "default" | "compact";
  title?: string;
}

export const FoodRecordsList = ({
  records,
  loading,
  onRecordClick,
  onAddRecord,
  variant = "default",
  title = "최근 기록",
}: FoodRecordsListProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
        <LoadingSpinner message="기록을 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {records.length > 0 && (
          <button
            className="text-sm text-green-600 hover:text-green-700 font-medium"
            onClick={() => {
              /* 전체 보기 기능 */
            }}
          >
            전체 보기
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <EmptyState
          icon={<UtensilsCrossed className="w-16 h-16" />}
          title="첫 번째 기록을 남겨보세요!"
          description="맛있게 먹은 음식을 기록하고 추억을 남겨보세요."
          action={
            onAddRecord
              ? {
                  label: "첫 기록 추가하기",
                  onClick: onAddRecord,
                }
              : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <FoodRecordCard
              key={record.id}
              record={record}
              onClick={onRecordClick}
              variant={variant}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 대시보드 통계 섹션
interface DashboardStatsProps {
  totalRecords: number;
  monthlyRecords: number;
  averageRating: number;
  favoriteCategory?: string;
}

export const DashboardStats = ({
  totalRecords,
  monthlyRecords,
  averageRating,
  favoriteCategory,
}: DashboardStatsProps) => {
  const stats = [
    {
      title: "총 기록",
      value: totalRecords,
      icon: <UtensilsCrossed className="w-5 h-5" />,
      trend:
        monthlyRecords > 0
          ? {
              value: Math.round(
                (monthlyRecords / Math.max(totalRecords - monthlyRecords, 1)) *
                  100
              ),
              isPositive: true,
            }
          : undefined,
    },
    {
      title: "이번 달",
      value: monthlyRecords,
      icon: <Plus className="w-5 h-5" />,
    },
    {
      title: "평균 별점",
      value: totalRecords > 0 ? `${averageRating.toFixed(1)}⭐` : "-",
    },
    {
      title: "선호 카테고리",
      value: favoriteCategory || "없음",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            {stat.icon && <div className="text-gray-400">{stat.icon}</div>}
          </div>
          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          {stat.trend && (
            <div
              className={`text-xs mt-1 ${
                stat.trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.trend.isPositive ? "↗" : "↘"} {Math.abs(stat.trend.value)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// 퀵 액션 패널
interface QuickActionsProps {
  onAddRecord: () => void;
  onSearch: () => void;
  onViewStats: () => void;
}

export const QuickActions = ({
  onAddRecord,
  onSearch,
  onViewStats,
}: QuickActionsProps) => {
  const actions = [
    {
      label: "기록 추가",
      icon: <Plus className="w-5 h-5" />,
      onClick: onAddRecord,
      primary: true,
    },
    {
      label: "검색",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      onClick: onSearch,
      primary: false,
    },
    {
      label: "통계",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      onClick: onViewStats,
      primary: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">빠른 실행</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`p-3 rounded-lg font-medium transition-all duration-200 flex flex-col items-center gap-2 ${
              action.primary
                ? "bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
          >
            {action.icon}
            <span className="text-xs">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
