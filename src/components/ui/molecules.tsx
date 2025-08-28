// Atomic Design Pattern - Molecules (atoms를 조합한 컴포넌트들)

import { MapPin, Calendar, Clock } from "lucide-react";
import { StarRating, Badge } from "./atoms";
import { FoodRecord } from "@/lib/db";

// 음식 기록 카드 컴포넌트
interface FoodRecordCardProps {
  record: FoodRecord;
  onClick?: (record: FoodRecord) => void;
  variant?: "default" | "compact";
}

export const FoodRecordCard = ({
  record,
  onClick,
  variant = "default",
}: FoodRecordCardProps) => {
  const isCompact = variant === "compact";

  return (
    <div
      className={`bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-green-200 ${
        isCompact ? "p-3" : "p-4"
      }`}
      onClick={() => onClick?.(record)}
    >
      {/* 음식 정보 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3
            className={`font-semibold text-gray-900 mb-1 ${
              isCompact ? "text-sm" : "text-base"
            }`}
          >
            {record.foodName}
          </h3>
          <p className={`text-gray-600 ${isCompact ? "text-xs" : "text-sm"}`}>
            {record.restaurantName}
          </p>
        </div>
        <StarRating rating={record.rating} size={isCompact ? "sm" : "md"} />
      </div>

      {/* 위치 및 날짜 정보 */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-gray-500">
          <MapPin className={isCompact ? "w-3 h-3" : "w-4 h-4"} />
          <span className={isCompact ? "text-xs" : "text-sm"}>
            {record.location.address}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar className={isCompact ? "w-3 h-3" : "w-4 h-4"} />
            <span className={isCompact ? "text-xs" : "text-sm"}>
              {record.date}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className={isCompact ? "w-3 h-3" : "w-4 h-4"} />
            <span className={isCompact ? "text-xs" : "text-sm"}>
              {record.time}
            </span>
          </div>
        </div>
      </div>

      {/* 한줄평 */}
      {record.review && (
        <div className="bg-gray-50 rounded-lg p-3 mt-3">
          <p
            className={`text-gray-700 italic ${
              isCompact ? "text-xs" : "text-sm"
            }`}
          >
            "{record.review}"
          </p>
        </div>
      )}

      {/* 사진이 있는 경우 표시 */}
      {record.photo && (
        <div className="mt-3">
          <Badge variant="success" size="sm">
            📷 사진 있음
          </Badge>
        </div>
      )}
    </div>
  );
};

// 빈 상태 컴포넌트
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-300 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

// 헤더 컴포넌트
interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export const Header = ({ title, subtitle, icon, action }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-green-600">{icon}</div>}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95"
            >
              {action.icon}
              {action.label}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

// 통계 그리드 컴포넌트
interface StatsGridProps {
  stats: Array<{
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: {
      value: number;
      isPositive: boolean;
    };
  }>;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
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
