"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "foodlog.theme";

export default function useTheme(initial?: Theme) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      if (typeof window === "undefined") return (initial as Theme) || "system";
      const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      return stored || (initial as Theme) || "system";
    } catch {
      return (initial as Theme) || "system";
    }
  });

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(STORAGE_KEY, theme);
      const html = document.documentElement;
      // remove other theme classes/attributes
      html.classList.remove("theme-dark", "theme-light", "theme-system");
      html.removeAttribute("data-theme");
      // apply new theme
      if (theme === "system") {
        html.classList.add("theme-system");
        html.setAttribute("data-theme", "system");
      } else if (theme === "dark") {
        html.classList.add("theme-dark");
        html.setAttribute("data-theme", "dark");
      } else {
        html.classList.add("theme-light");
        html.setAttribute("data-theme", "light");
      }
    } catch {
      // ignore
    }
  }, [theme]);

  return { theme, setTheme } as const;
}
