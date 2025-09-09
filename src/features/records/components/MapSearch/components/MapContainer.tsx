"use client";

import React, { RefObject, useEffect, useState, useCallback } from "react";
import { KAKAO_SDK_URL, validateKakaoApiKey } from "../utils";

interface MapContainerProps {
  mapContainer: RefObject<HTMLDivElement | null>;
  onScriptLoad: () => void;
  onScriptError?: () => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  mapContainer,
  onScriptLoad,
  onScriptError,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleScriptLoad = useCallback(() => {
    console.log("✅ Kakao Maps script loaded successfully");
    setScriptLoaded(true);
    onScriptLoad();
  }, [onScriptLoad]);

  const handleScriptError = useCallback((error: Event | string) => {
    console.error("❌ Failed to load Kakao Maps script", {
      url: KAKAO_SDK_URL,
      apiKeyValid: validateKakaoApiKey().isValid,
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      error: error,
      userAgent: navigator.userAgent,
    });
    onScriptError?.();
  }, [onScriptError]);

  // API 키 검증
  const apiKeyValidation = validateKakaoApiKey();

  // 동적 스크립트 로딩
  useEffect(() => {
    if (!apiKeyValidation.isValid) {
      handleScriptError("API key validation failed");
      return;
    }

    if (scriptLoaded || !KAKAO_SDK_URL) return;

    // 이미 로드된 스크립트가 있는지 확인
    const existingScript = document.querySelector(
      `script[src*="dapi.kakao.com"]`
    );
    if (existingScript) {
      handleScriptLoad();
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.onload = handleScriptLoad;
    script.onerror = handleScriptError;

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [apiKeyValidation.isValid, scriptLoaded, handleScriptError, handleScriptLoad]);

  // API 키가 없거나 유효하지 않으면 에러 콜백 실행
  useEffect(() => {
    if (!apiKeyValidation.isValid) {
      handleScriptError("API key validation failed");
    }
  }, [apiKeyValidation.isValid, handleScriptError]);

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh] rounded-xl overflow-hidden bg-gray-100"
      />
    </div>
  );
};
