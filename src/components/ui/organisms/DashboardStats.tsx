import { UtensilsCrossed, Plus } from "lucide-react";

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
