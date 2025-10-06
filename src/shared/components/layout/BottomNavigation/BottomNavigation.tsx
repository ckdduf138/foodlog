"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Settings } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export const BottomNavigation = () => {
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    {
      id: "home",
      label: "홈",
      icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "/home",
    },
    {
      id: "records",
      label: "기록",
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "/records",
    },
    // {
    //   id: "stats",
    //   label: "통계",
    //   icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />,
    //   href: "/stats",
    // },
    {
      id: "settings",
      label: "설정",
      icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "/settings",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/home") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__inner">
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.id}
              href={item.href}
              prefetch={true}
              className={`flex flex-col items-center justify-center py-1.5 sm:py-2 px-4 sm:px-6 transition-colors rounded-lg min-w-[60px] sm:min-w-[70px] ${
                active
                  ? "text-[var(--color-primary)] bg-[var(--color-secondary)]"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
              }`}
            >
              <div className="mb-0.5 sm:mb-1">{item.icon}</div>
              <span className="text-xs font-medium truncate max-w-full">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
