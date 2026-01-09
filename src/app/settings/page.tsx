"use client";

import { MainLayout, Header } from "@/shared/components";
import { Settings, Info, Smartphone, Palette, MessageSquare } from "lucide-react";
import { ThemeSelector, FeedbackForm } from "@/features/settings";
import CreatePwaButton from "@/features/settings/components/CreatePwaButton";
import { cn } from "@/shared/utils";

// 설정 섹션 컴포넌트
const SettingSection = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "p-4 rounded-2xl",
      "bg-[var(--color-background)]",
      "border border-[var(--color-border)]",
      "shadow-sm"
    )}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-xl bg-[var(--color-green-100)] text-[var(--color-green-600)]">
        {icon}
      </div>
      <h3 className="text-base font-bold text-[var(--color-foreground)]">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

// 설정 행 컴포넌트
const SettingRow = ({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-[var(--color-muted-foreground)]">{label}</span>
    <span className="text-sm font-semibold text-[var(--color-foreground)]">
      {value}
    </span>
  </div>
);

const SettingsPage = () => {
  return (
    <MainLayout showFab={false}>
      <Header
        title="설정"
        subtitle="앱 환경을 설정하세요"
        icon={<Settings className="w-5 h-5" />}
        size="md"
      />

      <div className="w-full space-y-4 mt-2">
        {/* 테마 설정 */}
        <SettingSection icon={<Palette className="w-5 h-5" />} title="테마">
          <ThemeSelector />
        </SettingSection>

        {/* PWA 설치 */}
        <SettingSection icon={<Smartphone className="w-5 h-5" />} title="앱 설치">
          <div className="space-y-3">
            <p className="text-sm text-[var(--color-muted-foreground)]">
              홈 화면에 앱을 추가하면 더 빠르게 접근할 수 있어요.
            </p>
            <CreatePwaButton />
          </div>
        </SettingSection>

        {/* 피드백 */}
        <SettingSection icon={<MessageSquare className="w-5 h-5" />} title="피드백">
          <FeedbackForm />
        </SettingSection>

        {/* 앱 정보 */}
        <SettingSection icon={<Info className="w-5 h-5" />} title="앱 정보">
          <div className="space-y-1">
            <SettingRow label="버전" value={process.env.NEXT_PUBLIC_APP_VERSION || "Beta"} />
          </div>
        </SettingSection>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
