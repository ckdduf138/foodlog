"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigation } from "@/hooks";
import { Header } from "@/components/ui/molecules";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  const { activeTab, changeTab } = useNavigation("settings");

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header title="설정" subtitle="앱 설정을 조정하세요" icon={<Settings className="w-6 h-6" />} />

      <div className="w-full text-center py-12">
        <h2 className="text-xl font-semibold">설정</h2>
        <p className="mt-2 text-sm text-gray-500">앱 설정을 조정하세요.</p>
      </div>
    </MainLayout>
  );
}
