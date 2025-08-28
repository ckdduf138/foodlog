// 메인 레이아웃 컴포넌트
"use client";

import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

interface MainLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const MainLayout = ({
  children,
  activeTab,
  onTabChange,
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* 메인 컨텐츠 */}
      <main className="pb-20">{children}</main>

      {/* 하단 네비게이션 */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
