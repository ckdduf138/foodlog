"use client";

import { Home, FileText, BarChart3, Settings } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const BottomNavigation = ({
  activeTab,
  onTabChange,
}: BottomNavigationProps) => {
  const navigationItems: NavigationItem[] = [
    {
      id: "home",
      label: "홈",
      icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: "records",
      label: "기록",
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: "stats",
      label: "통계",
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: "settings",
      label: "설정",
      icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--color-background)] border-t border-[var(--color-border)] px-2 sm:px-4 py-2 z-50 safe-area-inset-bottom">
      <div className="flex justify-around max-w-md mx-auto">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center py-1.5 sm:py-2 px-2 sm:px-4 transition-colors rounded-lg min-w-0 ${
              activeTab === item.id
                ? "text-[var(--color-primary)] bg-[var(--color-secondary)]"
                : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
            }`}
          >
            <div className="mb-0.5 sm:mb-1">{item.icon}</div>
            <span className="text-xs font-medium truncate max-w-full">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
