import React from "react";
import { MapPin } from "lucide-react";
import { FoodRecordFormData } from "@/features/records/types";

interface LocationCardProps {
  formData: FoodRecordFormData;
}

export const LocationCard: React.FC<LocationCardProps> = ({ formData }) => {
  const hasLocation = formData.location.placeName;

  return (
    <div
      className="rounded-2xl p-2 border"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: hasLocation
          ? "var(--color-green-200)"
          : "var(--color-border)",
      }}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            !hasLocation ? "animate-pulse" : ""
          }`}
          style={{
            backgroundColor: hasLocation
              ? "var(--color-green-500)"
              : "var(--color-muted)",
          }}
        >
          <MapPin
            className={`w-4 h-4 ${
              hasLocation ? "text-black" : "text-muted-foreground"
            }`}
          />
        </div>
        <div className="flex-1">
          {hasLocation ? (
            <>
              <p
                className="font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                {formData.location.placeName}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {formData.location.address}
              </p>
            </>
          ) : (
            <>
              <p
                className="font-semibold"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                맛집이나 카페를 검색해보세요
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                서울특별시 구로구 고척동 123-45
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
