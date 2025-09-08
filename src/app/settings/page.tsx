"use client";

import { MainLayout, Header } from "@/shared/components";
import { useNavigation } from "@/shared/hooks";
import { Settings } from "lucide-react";
import { ThemeSelector } from "@/features/settings";

const SettingsPage = () => {
  const { activeTab, changeTab } = useNavigation("settings");

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="설정"
        subtitle="앱 설정을 조정하세요"
        icon={<Settings className="w-6 h-6" />}
      />

      <div className="w-full px-4 py-6 space-y-6">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold text-[var(--color-foreground)]">
            설정
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            앱 설정을 조정하세요.
          </p>
        </div>

        <ThemeSelector />

        {/* 추가 설정 섹션들을 위한 공간 */}
        <div className="max-w-md mx-auto space-y-4">
          <div className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-3">
              앱 정보
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-muted-foreground)]">
                  버전
                </span>
                <span className="text-[var(--color-green-600)] font-medium bg-[var(--color-green-100)] px-3 py-1 rounded-full">
                  Beta
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
              피드백
            </h3>
            <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
              앱을 개선하는데 도움을 주세요!
            </p>
            <button className="w-full py-3 px-4 bg-[var(--color-green-600)] text-white rounded-lg font-medium hover:bg-[var(--color-green-700)] transition-colors shadow-sm">
              피드백 보내기
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
