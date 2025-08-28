import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {trend && (
        <div
          className={`text-xs mt-1 ${
            trend.isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
};
