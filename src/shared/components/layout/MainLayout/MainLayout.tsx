"use client";

import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { BottomNavigation } from "@/shared/components";
import { useRouter, usePathname } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleAddRecord = () => {
    router.push("/records/new");
  };

  const showFab = !(pathname && pathname.startsWith("/records/new"));
  
  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] overflow-x-hidden flex flex-col items-center">
      {/* 헤더 영역 - fixed with safe-area */}
      <div 
        className="w-full fixed left-0 right-0 z-40"
        style={{ 
          top: 0,
          paddingTop: 'var(--safe-area-inset-top, 0px)',
          backgroundColor: 'var(--color-background)',
        }}
      >
        {Array.isArray(children) ? children[0] : null}
      </div>
      
      {/* 헤더 높이 + safe-area만큼 spacer */}
      <div 
        className="w-full" 
        style={{ 
          height: 'calc(var(--header-height) + var(--safe-area-inset-top, 0px))' 
        }}
      ></div>
      
      {/* 메인 컨텐츠 */}
      <main className="w-full flex-1 flex flex-col items-stretch px-3 py-4 content-with-bottom-nav">
        {Array.isArray(children) ? children.slice(1) : children}
      </main>

      {/* 플로팅 추가 버튼 (FAB) */}
      {showFab && (
        <button
          onClick={handleAddRecord}
          aria-label="기록 추가"
          className="fab--above-bottom-nav bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-primary-foreground)] rounded-full p-3 shadow-lg flex items-center justify-center transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      )}

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  );
};
