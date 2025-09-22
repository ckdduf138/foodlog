import { UtensilsCrossed, Calendar, TrendingUp, Star } from "lucide-react";

interface DashboardProps {
  totalRecords: number;
  weeklyRecords: number;
  averageRating: number;
  streakDays: number;
}

export const Dashboard = ({
  totalRecords,
  weeklyRecords,
  averageRating,
  streakDays,
}: DashboardProps) => {
  const stats = [
    {
      title: "총 기록",
      value: totalRecords,
      icon: <UtensilsCrossed className="w-5 h-5" />,
    },
    {
      title: "이번 주",
      value: weeklyRecords,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "평균 평점",
      value: totalRecords > 0 ? `${averageRating.toFixed(1)}` : "-",
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "연속 기록",
      value: `${streakDays}일`,
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[var(--color-background)] p-3 sm:p-4 rounded-xl shadow-sm border border-[var(--color-border)] hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-medium text-[var(--color-muted-foreground)] truncate">
              {stat.title}
            </h3>
            {stat.icon && (
              <div className="text-[var(--color-green-500)] flex-shrink-0">
                {stat.icon}
              </div>
            )}
          </div>
          <p className="text-lg sm:text-2xl font-bold text-[var(--color-foreground)] truncate">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};
