"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/ui/common/molecules/Header";
import { Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

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

      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={() => setTheme("light")}
          className={`p-2 rounded-full ${
            theme === "light" ? "bg-green-200" : ""
          }`}
        >
          <Sun className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 rounded-full ${
            theme === "dark" ? "bg-gray-700" : ""
          }`}
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

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
          <h2 className="text-xl font-semibold">설정</h2>
          <p className="mt-2 text-sm text-gray-500">앱 설정을 조정하세요.</p>
        </div>

        <ThemeSelector />
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
