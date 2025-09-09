/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapCoordinates, KakaoSearchResult, PlaceSearchResult } from "./types";

// API 키 확인
const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

export const KAKAO_SDK_URL = KAKAO_API_KEY
  ? `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`
  : "";

// API 키 검증 함수
export const validateKakaoApiKey = (): { isValid: boolean; error?: string } => {
  console.log("🔍 API Key validation:", {
    hasKey: !!KAKAO_API_KEY,
    keyLength: KAKAO_API_KEY?.length || 0,
    keyPreview: KAKAO_API_KEY ? `${KAKAO_API_KEY.substring(0, 8)}...` : "none",
  });

  if (!KAKAO_API_KEY) {
    return {
      isValid: false,
      error:
        "카카오 API 키가 설정되지 않았습니다. 환경변수 NEXT_PUBLIC_KAKAO_REST_API_KEY를 확인해주세요.",
    };
  }

  if (KAKAO_API_KEY.length < 10) {
    return {
      isValid: false,
      error: "카카오 API 키가 올바르지 않습니다. 키 형식을 확인해주세요.",
    };
  }

  return { isValid: true };
};

export const DEFAULT_COORDINATES: MapCoordinates = {
  latitude: 37.566826,
  longitude: 126.9786567, // Seoul City Hall
};

export const isKakaoMapsAvailable = (): boolean => {
  return typeof window !== "undefined" && !!window.kakao && !!window.kakao.maps;
};

export const getCurrentPosition = (): Promise<MapCoordinates> => {
  return new Promise((resolve, reject) => {
    // 1. Geolocation API 지원 확인
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    // 2. HTTPS 환경 확인
    if (location.protocol !== "https:" && location.hostname !== "localhost") {
      console.warn("⚠️ HTTPS가 아닌 환경에서는 위치 권한이 제한될 수 있습니다");
    }

    const options = {
      enableHighAccuracy: true, // 더 정확한 위치 요청
      timeout: 15000, // 15초 타임아웃 (더 길게)
      maximumAge: 30000, // 30초 동안 캐시된 위치 사용 (더 짧게)
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;

        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      options
    );
  });
};

export const createMapInstance = (
  container: HTMLDivElement,
  coordinates: MapCoordinates
) => {
  if (!isKakaoMapsAvailable()) {
    throw new Error("Kakao Maps API not available");
  }

  const options = {
    center: new window.kakao.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude
    ),
    level: 2, // 더 상세한 레벨 (1-14, 작을수록 확대)
  };

  const map = new window.kakao.maps.Map(container, options);

  return map;
};

export const createMarker = (map: any, place: any, onSelect: () => void) => {
  const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
  const marker = new window.kakao.maps.Marker({
    position: markerPosition,
  });

  marker.setMap(map);

  const iwContent = `
    <div style="padding:5px;font-size:12px;width:200px;">
      <strong>${place.place_name}</strong><br/>
      ${place.address_name}<br/>
      <button 
        onclick="(${onSelect})()" 
        style="margin-top:5px;padding:2px 8px;background:#22c55e;color:white;border:none;border-radius:4px;cursor:pointer;"
      >
        선택
      </button>
    </div>
  `;

  const infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent,
  });

  window.kakao.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });

  return { marker, infowindow };
};

export const clearMarkersAndInfowindows = (
  markers: any[],
  infowindows: any[]
) => {
  markers.forEach((marker) => marker.setMap(null));
  infowindows.forEach((infowindow) => infowindow.close());
  return { markers: [], infowindows: [] };
};

export const convertToLocationData = (result: KakaoSearchResult) => {
  return {
    id: result.id,
    name: result.place_name,
    address: result.address_name,
    roadAddress: result.road_address_name,
    lat: parseFloat(result.y),
    lng: parseFloat(result.x),
    category: result.category_name,
    phone: result.phone,
    url: result.place_url,
  };
};

export const convertToPlaceSelect = (result: KakaoSearchResult) => {
  return {
    placeId: result.id,
    placeName: result.place_name,
    address: result.address_name,
    latitude: parseFloat(result.y),
    longitude: parseFloat(result.x),
  };
};

// 현재 위치 마커 생성
export const createCurrentLocationMarker = (
  map: any,
  coordinates: MapCoordinates
) => {
  const markerPosition = new window.kakao.maps.LatLng(
    coordinates.latitude,
    coordinates.longitude
  );

  // 현재 위치 마커 (다른 색상으로 구분)
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
  const imageSize = new window.kakao.maps.Size(24, 35);
  const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

  const marker = new window.kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
  });

  marker.setMap(map);

  // 현재 위치 정보창
  const iwContent = `
    <div style="padding:8px;font-size:12px;width:220px;text-align:center;">
      <strong style="color:#e74c3c;">📍 현재 위치</strong><br/>
      <small style="color:#666;">
        위도: ${coordinates.latitude.toFixed(6)}<br/>
        경도: ${coordinates.longitude.toFixed(6)}<br/>
      </small>
    </div>
  `;

  const infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent,
  });

  window.kakao.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });

  return { marker, infowindow };
};

// 두 좌표 간의 거리 계산 (km)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 거리 기반으로 장소 정렬
export const sortPlacesByDistance = (
  places: PlaceSearchResult[],
  currentLocation: MapCoordinates
): PlaceSearchResult[] => {
  return places
    .map((place) => ({
      ...place,
      calculatedDistance: calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        parseFloat(place.y),
        parseFloat(place.x)
      ),
    }))
    .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
};

// 거리 표시 형식화
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

// 현재 위치 새로고침
export const refreshCurrentPosition = (): Promise<MapCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0, // 캐시 사용하지 않고 새로 가져오기
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;

        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => {
        console.error("Failed to refresh current position:", {
          code: error.code,
          message: error.message,
        });
        reject(error);
      },
      options
    );
  });
};
