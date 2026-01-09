"use client";

import { ReactNode, useCallback, Suspense } from "react";
import { Plus } from "lucide-react";
import { BottomNavigation } from "@/shared/components";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/shared/utils";

interface MainLayoutProps {
  children: ReactNode;
  showFab?: boolean;
}

// FAB 컴포넌트 분리
const FloatingActionButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label="기록 추가"
    className={cn(
      "fab--above-bottom-nav",
      "bg-[var(--color-primary)]",
      "hover:bg-[var(--color-green-700)]",
      "text-white",
      "rounded-full p-3.5",
      "shadow-lg hover:shadow-xl",
      "flex items-center justify-center",
      "transition-all duration-200",
      "active:scale-95",
      "touch-manipulation select-none"
    )}
  >
    <Plus className="h-6 w-6" strokeWidth={2.5} />
  </button>
);

export const MainLayout = ({ children, showFab: propShowFab }: MainLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleAddRecord = useCallback(() => {
    router.push("/records/new");
  }, [router]);

  // FAB 표시 여부 결정
  const shouldShowFab = propShowFab !== undefined 
    ? propShowFab 
    : !(pathname && pathname.startsWith("/records/new"));

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] overflow-x-hidden flex flex-col">
      {/* 메인 컨텐츠 영역 */}
      <div
        className="flex-1 flex flex-col w-full"
        style={{
          paddingTop: "calc(var(--safe-area-inset-top, 0px))",
        }}
      >
        <Suspense fallback={null}>
          <main className="flex-1 flex flex-col w-full px-4 py-4 content-with-bottom-nav">
            {children}
          </main>
        </Suspense>
      </div>

      {/* 플로팅 추가 버튼 (FAB) */}
      {shouldShowFab && <FloatingActionButton onClick={handleAddRecord} />}

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  );
};
