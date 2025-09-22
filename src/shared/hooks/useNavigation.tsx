"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useNavigation = (initialTab = "home") => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/records")) setActiveTab("records");
    else if (pathname.startsWith("/stats")) setActiveTab("stats");
    else if (pathname.startsWith("/settings")) setActiveTab("settings");
    else setActiveTab("home");
  }, [pathname]);

  const changeTab = (tabId: string) => {
    setActiveTab(tabId);
    const routeMap: Record<string, string> = {
      home: "/home",
      records: "/records",
      stats: "/stats",
      settings: "/settings",
    };
    const to = routeMap[tabId] || "/home";
    router.push(to);
  };

  return { activeTab, changeTab };
};
