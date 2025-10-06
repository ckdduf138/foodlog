"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Palette } from "lucide-react";
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
        className="p-4 sm:p-6 rounded-2xl shadow-sm"
        style={{
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--color-border)',
        }}
        aria-label="테마 설정"
      >
        <div className="flex items-start gap-3 mb-4">
          <div
            className="p-2 rounded-lg flex-shrink-0"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
              테마 설정
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
              라이트/다크/시스템 설정을 선택하세요
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
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
      className="p-4 sm:p-6 rounded-2xl shadow-sm"
      style={{
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
      }}
      aria-label="테마 설정"
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="p-2 rounded-lg flex-shrink-0"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Palette className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
            테마 설정
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            라이트/다크/시스템 설정을 선택하세요
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
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
