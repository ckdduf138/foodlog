"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect } from "react";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="max-w-md mx-auto p-6 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-sm"
        aria-label="테마 설정"
      >
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
          테마 설정
        </h3>
        <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
          라이트/다크/시스템 설정을 선택하세요.
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border border-[var(--color-border)]">
            <Sun className="w-5 h-5 mx-auto mb-2" />
            <span className="block text-xs text-center">라이트</span>
          </div>
          <div className="p-3 rounded-lg border border-[var(--color-border)]">
            <Moon className="w-5 h-5 mx-auto mb-2" />
            <span className="block text-xs text-center">다크</span>
          </div>
          <div className="p-3 rounded-lg border border-[var(--color-border)]">
            <Monitor className="w-5 h-5 mx-auto mb-2" />
            <span className="block text-xs text-center">시스템</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-md mx-auto p-6 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-sm"
      aria-label="테마 설정"
    >
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
        테마 설정
      </h3>
      <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
        라이트/다크/시스템 설정을 선택하세요.
      </p>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setTheme("light")}
          className={`p-3 rounded-lg border transition-all duration-200 ${
            theme === "light"
              ? "bg-[var(--color-green-600)] text-white border-[var(--color-green-600)] shadow-lg"
              : "border-[var(--color-border)] hover:border-[var(--color-green-400)] hover:bg-[var(--color-green-50)] text-[var(--color-foreground)]"
          }`}
        >
          <Sun className="w-5 h-5 mx-auto mb-2" />
          <span className="block text-xs text-center font-medium">라이트</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`p-3 rounded-lg border transition-all duration-200 ${
            theme === "dark"
              ? "bg-[var(--color-green-600)] text-white border-[var(--color-green-600)] shadow-lg"
              : "border-[var(--color-border)] hover:border-[var(--color-green-400)] hover:bg-[var(--color-green-50)] text-[var(--color-foreground)]"
          }`}
        >
          <Moon className="w-5 h-5 mx-auto mb-2" />
          <span className="block text-xs text-center font-medium">다크</span>
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`p-3 rounded-lg border transition-all duration-200 ${
            theme === "system"
              ? "bg-[var(--color-green-600)] text-white border-[var(--color-green-600)] shadow-lg"
              : "border-[var(--color-border)] hover:border-[var(--color-green-400)] hover:bg-[var(--color-green-50)] text-[var(--color-foreground)]"
          }`}
        >
          <Monitor className="w-5 h-5 mx-auto mb-2" />
          <span className="block text-xs text-center font-medium">시스템</span>
        </button>
      </div>
    </div>
  );
};
