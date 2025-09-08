import { Plus, Search, BarChart3 } from "lucide-react";

interface QuickActionsProps {
  onAddRecord?: () => void;
  onSearch: () => void;
  onViewStats: () => void;
}

export const QuickActions = ({
  onAddRecord,
  onSearch,
  onViewStats,
}: QuickActionsProps) => {
  const actions = [
    ...(onAddRecord
      ? [
          {
            label: "기록 추가",
            icon: <Plus className="w-5 h-5" />,
            onClick: onAddRecord,
            primary: true,
          },
        ]
      : []),
    {
      label: "검색",
      icon: <Search className="w-5 h-5" />,
      onClick: onSearch,
      primary: false,
    },
    {
      label: "통계",
      icon: <BarChart3 className="w-5 h-5" />,
      onClick: onViewStats,
      primary: false,
    },
  ];

  return (
    <div
      className="rounded-xl shadow-sm border p-3 sm:p-4 mb-4 sm:mb-6"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <h3
        className="text-base sm:text-lg font-semibold mb-3"
        style={{ color: "var(--color-foreground)" }}
      >
        빠른 실행
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`p-2 sm:p-3 rounded-lg font-medium transition-all duration-200 flex flex-col items-center gap-1 sm:gap-2 ${
              action.primary
                ? "text-white shadow-sm hover:shadow-md"
                : "shadow-sm"
            }`}
            style={
              action.primary
                ? {
                    backgroundColor: "var(--color-green-500)",
                    color: "white",
                  }
                : {
                    backgroundColor: "var(--color-muted)",
                    color: "var(--color-muted-foreground)",
                  }
            }
            onMouseEnter={(e) => {
              if (action.primary) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-green-600)";
              } else {
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
              }
            }}
            onMouseLeave={(e) => {
              if (action.primary) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-green-500)";
              } else {
                e.currentTarget.style.backgroundColor = "var(--color-muted)";
              }
            }}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5">{action.icon}</div>
            <span className="text-xs sm:text-sm font-medium">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
