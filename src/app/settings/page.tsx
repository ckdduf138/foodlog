"use client";

import { MainLayout, Header } from "@/shared/components";
import { Settings } from "lucide-react";
import { ThemeSelector, FeedbackForm } from "@/features/settings";
import CreatePwaButton from "@/features/settings/components/CreatePwaButton";

const SettingsPage = () => {
  return (
    <MainLayout>
      <Header
        title="설정"
        subtitle="앱 설정을 조정하세요"
        icon={<Settings className="w-6 h-6" />}
      />

      <div className="w-full space-y-6">
        <ThemeSelector />

        {/* 피드백 폼 */}
        <FeedbackForm />

        {/* 추가 설정 섹션들을 위한 공간 */}
        <div className="space-y-4">
      {/* App Info */}
      <div
        className="p-4 sm:p-6 rounded-2xl shadow-sm"
        style={{
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div
            className="p-2 rounded-lg flex-shrink-0"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
              앱 정보
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm sm:text-base" style={{ color: 'var(--color-muted-foreground)' }}>
            버전
          </span>
          <span className="text-sm sm:text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
            {process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}
          </span>
        </div>
      </div>          <CreatePwaButton />
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
