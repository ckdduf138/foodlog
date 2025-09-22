"use client";

import React, { useState } from "react";
import usePwaInstall from "@/features/settings/hooks/usePwaInstall";

interface Props {
  className?: string;
}

const CreatePwaButton: React.FC<Props> = ({ className }) => {
  const { supported, install, promptAvailable } = usePwaInstall();
  const [installing, setInstalling] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onClick = async () => {
    setMessage(null);
    if (!promptAvailable) {
      setMessage("설치 가능한 환경이 아닙니다. 브라우저에서 PWA 설치를 지원해야 합니다.");
      return;
    }
    setInstalling(true);
    const ok = await install();
    setInstalling(false);
    setMessage(ok ? "앱이 설치되었습니다." : "설치가 취소되었거나 실패했습니다.");
  };

  if (!supported) {
    return (
      <div className={className}>
        <button
          disabled
          className="w-full py-3 px-4 rounded-lg bg-[var(--color-border)] text-[var(--color-muted-foreground)] cursor-not-allowed"
        >
          PWA 만들기
        </button>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-2">이 브라우저에서는 설치 안내가 지원되지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        onClick={onClick}
        disabled={!promptAvailable || installing}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-sm transition-colors ${
          installing ? "bg-[var(--color-green-500)] opacity-80 cursor-wait" : "bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)]"
        }`}
      >
        {installing ? "설치 중..." : "PWA 만들기"}
      </button>
      {message && <p className="text-sm text-[var(--color-muted-foreground)] mt-2">{message}</p>}
    </div>
  );
};

export default CreatePwaButton;
