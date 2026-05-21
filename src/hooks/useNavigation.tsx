"use client";

import { usePathname, useRouter } from "next/navigation";

const getActiveTab = (pathname: string | null): string => {
  if (!pathname) return "home";
  if (pathname.startsWith("/records")) return "records";
  if (pathname.startsWith("/stats")) return "stats";
  if (pathname.startsWith("/settings")) return "settings";
  return "home";
};

export const useNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = getActiveTab(pathname);

  const changeTab = (tabId: string) => {
    const routeMap: Record<string, string> = {
      home: "/home",
      records: "/records",
      stats: "/stats",
      settings: "/settings",
    };
    router.push(routeMap[tabId] || "/home");
  };

  return { activeTab, changeTab };
};
