"use client";

import { ReactNode, useState } from "react";
import { Plus, Zap } from "lucide-react";
import { BottomNavigation } from "@/shared/components";
import { usePathname } from "next/navigation";
import { QuickAddSheet } from "@/shared/components/ui/QuickAddSheet";
import { cn } from "@/shared/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [fabExpanded, setFabExpanded] = useState(false);

  const showFab = !(pathname && pathname.startsWith("/records/new"));

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] overflow-x-hidden flex flex-col items-center">
      {/* 헤더 영역 - fixed with safe-area */}
      <div
        className="w-full fixed left-0 right-0 z-40"
        style={{
          top: 0,
          paddingTop: "var(--safe-area-inset-top, 0px)",
          backgroundColor: "var(--color-background)",
        }}
      >
        {Array.isArray(children) ? children[0] : null}
      </div>

      {/* 헤더 높이 + safe-area만큼 spacer */}
      <div
        className="w-full"
        style={{
          height:
            "calc(var(--header-height) + var(--safe-area-inset-top, 0px))",
        }}
      />

      {/* 메인 컨텐츠 */}
      <main className="w-full flex-1 flex flex-col items-stretch px-3 py-4 content-with-bottom-nav">
        {Array.isArray(children) ? children.slice(1) : children}
      </main>

      {/* FAB 메뉴 */}
      {showFab && (
        <div className="fab--above-bottom-nav flex flex-col items-end gap-2">
          {/* 확장 메뉴 */}
          {fabExpanded && (
            <>
              {/* 빠른 등록 */}
              <div className="flex items-center gap-2 animate-slide-up">
                <span className="bg-[var(--color-background)] text-[var(--color-foreground)] text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-[var(--color-border)] whitespace-nowrap">
                  빠른 등록
                </span>
                <button
                  onClick={() => {
                    setFabExpanded(false);
                    setSheetOpen(true);
                  }}
                  aria-label="빠른 기록 추가"
                  className="bg-[var(--color-green-500)] hover:bg-[var(--color-green-600)] text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-colors active:scale-95"
                >
                  <Zap className="h-4 w-4" />
                </button>
              </div>

              {/* 상세 등록 */}
              <div className="flex items-center gap-2 animate-slide-up [animation-delay:50ms]">
                <span className="bg-[var(--color-background)] text-[var(--color-foreground)] text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-[var(--color-border)] whitespace-nowrap">
                  상세 등록
                </span>
                <a
                  href="/records/new"
                  aria-label="상세 기록 추가"
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-primary-foreground)] rounded-full p-3 shadow-lg flex items-center justify-center transition-colors active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                </a>
              </div>
            </>
          )}

          {/* 메인 FAB */}
          <button
            onClick={() => setFabExpanded((v) => !v)}
            aria-label="기록 추가"
            aria-expanded={fabExpanded}
            className={cn(
              "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-full p-3.5 shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95",
              fabExpanded && "rotate-45"
            )}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* 배경 클릭 시 FAB 닫기 */}
      {fabExpanded && (
        <div
          className="fixed inset-0 z-[25]"
          onClick={() => setFabExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* 빠른 등록 바텀시트 */}
      <QuickAddSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  );
};
