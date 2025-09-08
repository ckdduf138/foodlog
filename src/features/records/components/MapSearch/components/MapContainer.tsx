"use client";

import React, { RefObject } from "react";
import Script from "next/script";
import { KAKAO_SDK_URL } from "../utils";

interface MapContainerProps {
  mapContainer: RefObject<HTMLDivElement | null>;
  onScriptLoad: () => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  mapContainer,
  onScriptLoad,
}) => {
  return (
    <div className="relative">
      <Script
        src={KAKAO_SDK_URL}
        onLoad={onScriptLoad}
        strategy="afterInteractive"
      />

      <div
        ref={mapContainer}
        className="w-full h-64 rounded-xl overflow-hidden bg-gray-100"
      />
    </div>
  );
};
