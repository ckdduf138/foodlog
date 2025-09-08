"use client";

import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { BottomNavigation } from "@/shared/components";
import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();

  const handleAddRecord = () => {
    router.push("/records/new");
  };

  const showFab = !(pathname && pathname.startsWith("/records/new"));
  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] overflow-x-hidden flex flex-col items-center">
      <div className="w-full fixed top-0 left-0 right-0 z-40">
        {Array.isArray(children) ? children[0] : null}
      </div>
      <div className="w-full h-16"></div>
      <main className="pb-20 w-full flex-1 flex flex-col items-stretch px-3">
        {Array.isArray(children) ? children.slice(1) : children}
      </main>

      {/* 플로팅 추가 버튼 (FAB) */}
      {showFab && (
        <button
          onClick={handleAddRecord}
          aria-label="기록 추가"
          className="fixed bottom-20 right-4 sm:right-8 z-50 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-primary-foreground)] rounded-full p-3 shadow-lg flex items-center justify-center transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      )}

      {/* 하단 네비게이션 */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
