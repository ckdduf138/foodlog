"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/shared/utils";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    { value: "light", label: "라이트", icon: <Sun className="w-5 h-5" /> },
    { value: "dark", label: "다크", icon: <Moon className="w-5 h-5" /> },
    { value: "system", label: "시스템", icon: <Monitor className="w-5 h-5" /> },
  ];

  if (!mounted) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {themeOptions.map((opt) => (
          <div
            key={opt.value}
            className="p-3 rounded-xl border border-[var(--color-border)] flex flex-col items-center gap-2"
          >
            <div className="text-[var(--color-muted-foreground)]">{opt.icon}</div>
            <span className="text-xs font-medium text-[var(--color-muted-foreground)]">
              {opt.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {themeOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          className={cn(
            "p-3 rounded-xl border transition-all duration-200",
            "flex flex-col items-center gap-2",
            "touch-manipulation active:scale-95",
            theme === opt.value
              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md"
              : "border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-green-50)] text-[var(--color-foreground)]"
          )}
        >
          {opt.icon}
          <span className="text-xs font-medium">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};
