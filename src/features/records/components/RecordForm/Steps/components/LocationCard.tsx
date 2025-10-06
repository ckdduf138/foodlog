import React, { useEffect, useState } from "react";
import { MapPin, MapPinOff } from "lucide-react";
import { FoodRecordFormData } from "@/features/records/types";
import { useReverseGeocode } from "../../hooks/useReverseGeocode";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";

interface LocationCardProps {
  formData: FoodRecordFormData;
}

export const LocationCard: React.FC<LocationCardProps> = ({ formData }) => {
  const { address, loading, error, fetchAddress } = useReverseGeocode();
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocationError("브라우저가 위치 정보를 지원하지 않습니다");
      return;
    }
    
    // formData.location이 "현재 위치"이거나 설정되지 않았을 때 현재 위치 가져오기
    const shouldFetchLocation = !formData.location.placeName || formData.location.placeName === "현재 위치";
    
    if (shouldFetchLocation) {
      setGeolocationError(null); // 에러 초기화
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchAddress(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
          let errorMessage = "위치 정보를 가져올 수 없음";
          
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = "위치 권한이 거부됨";
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage = "위치 정보를 사용할 수 없음";
              break;
            case err.TIMEOUT:
              errorMessage = "위치 정보 요청 시간 초과";
              break;
          }
          
          setGeolocationError(errorMessage);
        }
      );
    }
  }, [formData.location.placeName, fetchAddress]);

  if (loading) return <LoadingSpinner message="주소 확인 중..." />;

  const hasLocation = formData.location.placeName && formData.location.placeName !== "현재 위치";
  const hasCurrentAddress = !!address && !geolocationError;
  const finalError = geolocationError || error;

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
            !hasLocation && !hasCurrentAddress ? "animate-pulse" : ""
          }`}
          style={{
            backgroundColor: hasLocation || hasCurrentAddress
              ? "var(--color-green-500)"
              : "var(--color-destructive)",
          }}
        >
          {hasLocation || hasCurrentAddress ? (
            <MapPin className="w-4 h-4 text-black" />
          ) : (
            <MapPinOff className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="flex-1">
          <p
            className="font-semibold"
            style={{ color: "var(--color-foreground)" }}
          >
            {hasLocation ? formData.location.placeName : "맛집이나 카페를 검색해보세요"}
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            {hasLocation 
              ? formData.location.address 
              : hasCurrentAddress 
                ? `현재 위치: ${address}` 
                : finalError 
                  ? `현재 위치: ${finalError}` 
                  : "현재 위치: 위치 정보를 가져올 수 없음"
            }
          </p>
        </div>
      </div>
    </div>
  );
};
