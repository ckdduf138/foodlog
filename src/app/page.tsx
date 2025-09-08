"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/home"), 1000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="text-3xl font-semibold text-green-600">FoodLog</div>
        <div className="mt-2 text-sm text-gray-500">푸드로그 로딩 중...</div>
      </div>
    </div>
  );
};

export default SplashPage;
