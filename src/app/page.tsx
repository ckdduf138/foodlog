"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UtensilsCrossed } from "lucide-react";

// 폰트 로딩 체크 함수
const waitForFont = (): Promise<void> => {
  return new Promise((resolve) => {
    // document.fonts API 사용 가능 여부 체크
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        // HannaPro 폰트가 로드되었는지 확인
        const fontLoaded = document.fonts.check("16px HannaPro");
        if (fontLoaded) {
          resolve();
        } else {
          // 폰트가 아직 로드되지 않았으면 load 시도
          document.fonts.load("16px HannaPro").then(() => resolve()).catch(() => resolve());
        }
      });
    } else {
      // document.fonts를 지원하지 않는 브라우저는 바로 resolve
      resolve();
    }
  });
};

// 최소 대기 시간
const MIN_SPLASH_TIME = 2000;

const SplashPage = () => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // 애니메이션 시작
    const animationTimer = setTimeout(() => setIsAnimating(false), 400);

    // 폰트 로딩 + 최소 2초 대기 (둘 다 완료되면 홈으로 이동)
    const loadAndRedirect = async () => {
      await Promise.all([
        waitForFont(),
        new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_TIME)),
      ]);
      router.replace("/home");
    };

    loadAndRedirect();

    return () => {
      clearTimeout(animationTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-background)]">
      <div className="text-center">
        {/* 로고 아이콘 */}
        <div
          className={`
            mx-auto w-20 h-20 rounded-2xl 
            bg-gradient-to-br from-[var(--color-green-400)] to-[var(--color-green-600)]
            flex items-center justify-center shadow-lg
            transition-all duration-500 ease-out
            ${isAnimating ? "scale-90 opacity-0" : "scale-100 opacity-100"}
          `}
        >
          <UtensilsCrossed className="w-10 h-10 text-white" strokeWidth={2} />
        </div>

        {/* 로딩 인디케이터 */}
        <div
          className={`
            mt-6 flex justify-center gap-1.5
            transition-opacity duration-500 delay-200
            ${isAnimating ? "opacity-0" : "opacity-100"}
          `}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--color-green-400)] animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
