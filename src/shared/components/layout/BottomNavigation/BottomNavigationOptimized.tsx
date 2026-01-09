"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Settings } from "lucide-react";
import { cn } from "@/shared/utils";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "홈",
    icon: <Home className="w-5 h-5" strokeWidth={1.5} />,
    activeIcon: <Home className="w-5 h-5" strokeWidth={2.5} />,
    href: "/home",
  },
  {
    id: "records",
    label: "기록",
    icon: <FileText className="w-5 h-5" strokeWidth={1.5} />,
    activeIcon: <FileText className="w-5 h-5" strokeWidth={2.5} />,
    href: "/records",
  },
  {
    id: "settings",
    label: "설정",
    icon: <Settings className="w-5 h-5" strokeWidth={1.5} />,
    activeIcon: <Settings className="w-5 h-5" strokeWidth={2.5} />,
    href: "/settings",
  },
];

const NavItem = memo(({
  item,
  isActive,
}: {
  item: NavigationItem;
  isActive: boolean;
}) => (
  <Link
    href={item.href}
    prefetch={true}
    className={cn(
      "relative flex items-center justify-center",
      "p-3",
      "transition-all duration-200",
      "touch-manipulation select-none",
      "-webkit-tap-highlight-color-transparent",
      // 최소 터치 영역 확보 (48x48)
      "w-12 h-12"
    )}
    aria-current={isActive ? "page" : undefined}
    aria-label={item.label}
  >
    {/* 활성 상태 배경 인디케이터 - 완전한 원형 */}
    {isActive && (
      <span
        className={cn(
          "absolute w-10 h-10",
          "bg-[var(--color-green-100)]",
          "rounded-full",
          "transition-all duration-200"
        )}
      />
    )}

    {/* 아이콘 */}
    <span
      className={cn(
        "relative z-10 transition-all duration-200",
        isActive
          ? "text-[var(--color-primary)] scale-110"
          : "text-[var(--color-muted-foreground)]"
      )}
    >
      {isActive ? item.activeIcon : item.icon}
    </span>
  </Link>
));

NavItem.displayName = "NavItem";

const BottomNavigationComponent = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/home") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <nav 
      className="bottom-nav"
      role="navigation"
      aria-label="메인 네비게이션"
    >
      <div className="bottom-nav__inner">
        {navigationItems.map((item) => (
          <NavItem 
            key={item.id} 
            item={item} 
            isActive={isActive(item.href)} 
          />
        ))}
      </div>
    </nav>
  );
};

BottomNavigationComponent.displayName = "BottomNavigation";

export const BottomNavigation = memo(BottomNavigationComponent);
