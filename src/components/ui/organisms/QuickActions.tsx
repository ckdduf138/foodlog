import { Plus, Search, BarChart3 } from "lucide-react";

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
