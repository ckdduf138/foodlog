"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/ui/molecules";
import { Settings } from "lucide-react";
import useTheme, { Theme } from "@/hooks/useTheme";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const onChange = (value: Theme) => () => setTheme(value);

  return (
    <div
      className="max-w-md mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border"
      aria-label="테마 설정"
    >
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
        테마
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        라이트/다크/시스템 설정을 선택하세요.
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {(["light", "dark", "system"] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={onChange(t)}
            className={`py-2 px-3 rounded-md border transition-colors text-sm font-medium focus-visible:outline-none ${
              theme === t
                ? "bg-green-50 border-green-300 text-green-700"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            aria-pressed={theme === t}
          >
            {t === "light" ? "라이트" : t === "dark" ? "다크" : "시스템"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
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
          <h2 className="text-xl font-semibold">설정</h2>
          <p className="mt-2 text-sm text-gray-500">앱 설정을 조정하세요.</p>
        </div>

        <ThemeSelector />
      </div>
    </MainLayout>
  );
}
