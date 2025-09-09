"use client";

import React, { RefObject } from "react";
import Script from "next/script";
import { KAKAO_SDK_URL } from "../utils";

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
    console.error("Failed to load Kakao Maps script");
    onScriptError?.();
  };

  return (
    <div className="relative">
      <Script
        src={KAKAO_SDK_URL}
        onLoad={onScriptLoad}
        onError={handleScriptError}
        strategy="afterInteractive"
      />

      <div
        ref={mapContainer}
        className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh] rounded-xl overflow-hidden bg-gray-100"
      />
    </div>
  );
};
