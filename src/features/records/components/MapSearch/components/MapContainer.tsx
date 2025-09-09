"use client";

import React, { RefObject } from "react";
import Script from "next/script";
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
  const handleScriptError = () => {
    console.error("Failed to load Kakao Maps script", {
      url: KAKAO_SDK_URL,
      apiKeyValid: validateKakaoApiKey().isValid,
    });
    onScriptError?.();
  };

  // API 키 검증
  const apiKeyValidation = validateKakaoApiKey();

  // API 키가 없거나 유효하지 않으면 에러 콜백 실행
  React.useEffect(() => {
    if (!apiKeyValidation.isValid) {
      onScriptError?.();
    }
  }, [apiKeyValidation.isValid, onScriptError]);

  return (
    <div className="relative">
      {apiKeyValidation.isValid && KAKAO_SDK_URL && (
        <Script
          src={KAKAO_SDK_URL}
          onLoad={onScriptLoad}
          onError={handleScriptError}
          strategy="afterInteractive"
        />
      )}

      <div
        ref={mapContainer}
        className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh] rounded-xl overflow-hidden bg-gray-100"
      />
    </div>
  );
};
