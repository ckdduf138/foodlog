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
          className="p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-sm font-medium"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              {stat.title}
            </h3>
            {stat.icon && (
              <div style={{ color: "var(--color-muted-foreground)" }}>
                {stat.icon}
              </div>
            )}
          </div>
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-foreground)" }}
          >
            {stat.value}
          </p>
          {stat.trend && (
            <div
              className="text-xs mt-1"
              style={{
                color: stat.trend.isPositive
                  ? "var(--color-green-600)"
                  : "#ef4444",
              }}
            >
              {stat.trend.isPositive ? "↗" : "↘"} {Math.abs(stat.trend.value)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
