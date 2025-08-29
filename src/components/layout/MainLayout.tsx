"use client";

import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { BottomNavigation } from "./BottomNavigation";

interface MainLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onAddRecord?: () => void;
}

export const MainLayout = ({
  children,
  activeTab,
  onTabChange,
  onAddRecord,
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 overflow-x-hidden flex flex-col items-center">
      {/* 헤더를 항상 상단에 고정 */}
      <div className="w-full fixed top-0 left-0 right-0 z-40">
        {/* 헤더는 children에서 첫 번째로 전달됨을 가정 (page.tsx에서 <Header />가 가장 먼저 렌더됨) */}
        {Array.isArray(children) ? children[0] : null}
      </div>
      {/* 메인 컨텐츠 */}
      <main className="pt-24 pb-16 sm:pb-20 w-full flex-1 flex flex-col items-stretch px-3 sm:px-6">
        {Array.isArray(children) ? children.slice(1) : children}
      </main>

      {/* 플로팅 추가 버튼 (FAB) */}
      {onAddRecord && (
        <button
          onClick={onAddRecord}
          aria-label="기록 추가"
          className="fixed bottom-20 right-4 sm:right-8 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
        >
          <Plus className="h-5 w-5" />
        </button>
      )}

      {/* 하단 네비게이션 */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
