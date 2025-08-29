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
            <div className={`text-xs mt-1 ${stat.trend.isPositive ? "text-green-600" : "text-red-600"}`}>
              {stat.trend.isPositive ? "↗" : "↘"} {Math.abs(stat.trend.value)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
