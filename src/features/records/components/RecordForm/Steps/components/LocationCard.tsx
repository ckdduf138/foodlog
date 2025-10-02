import React, { useEffect } from "react";
import { MapPin, MapPinOff } from "lucide-react";
import { FoodRecordFormData } from "@/features/records/types";
import { useReverseGeocode } from "../../hooks/useReverseGeocode";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

interface LocationCardProps {
  formData: FoodRecordFormData;
}

export const LocationCard: React.FC<LocationCardProps> = ({ formData }) => {
  const { address, loading, error, fetchAddress } = useReverseGeocode();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchAddress(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        // fetchAddress를 호출하지 않고 에러 상태는 훅의 error가 아닌 로컬에서 처리
      }
    );
  }, [fetchAddress]);

  if (loading) return <LoadingSpinner message="주소 확인 중..." />;
  if (error) return <div className="text-red-500">{error}</div>;

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
              : address
              ? "var(--color-muted)"
              : "var(--color-destructive)",
          }}
        >
          {address ? (
            <MapPin
              className={`w-4 h-4 ${
                hasLocation ? "text-black" : "text-muted-foreground"
              }`}
            />
          ) : (
            <MapPinOff className="w-4 h-4 text-white" />
          )}
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
              <p
                className="text-sm font-semibold"
                style={{ color: address ? "var(--color-green-500)" : "var(--color-destructive)" }}
              >
                현재 위치: {address ? address : "위치 정보를 가져올 수 없음"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
