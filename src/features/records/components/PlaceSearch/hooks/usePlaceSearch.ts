import { useCallback, useState } from "react";
import type { PlaceSelect } from "@/features/records/types";
import type { PlaceSearchResult } from "../types";
import { getCurrentPosition, checkLocationPermission } from "@/features/records/utils/geolocation";

interface UsePlaceSearchProps {
  onPlaceSelect: (place: PlaceSelect) => void;
}

export const usePlaceSearch = ({ onPlaceSelect }: UsePlaceSearchProps) => {
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [places, setPlaces] = useState<PlaceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<PlaceSelect | null>(null);

  const handlePlaceSelect = useCallback(
    (place: PlaceSelect) => {
      onPlaceSelect(place);
    },
    [onPlaceSelect]
  );

const searchPlaces = useCallback(async (searchKeyword: string) => {
  if (!searchKeyword.trim()) {
    setShowDropdown(false);
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  if (!apiKey) {
    setError("API 키가 설정되지 않았습니다");
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    // 1. 좌표 먼저 가져오기
    let currentCoords: { latitude: number; longitude: number } | null = null;
    try {
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        currentCoords = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              }),
            (err) => reject(err),
            { enableHighAccuracy: false, timeout: 5000 }
          );
        });
      }
    } catch {
      currentCoords = null;
    }

    // 2. API URL 만들기 (좌표 있으면 거리순 정렬 적용)
    const url = new URL("https://dapi.kakao.com/v2/local/search/keyword.json");
    url.searchParams.set("query", searchKeyword);

    if (currentCoords) {
      url.searchParams.set("x", currentCoords.longitude.toString());
      url.searchParams.set("y", currentCoords.latitude.toString());
      url.searchParams.set("sort", "distance");
    }

    // 3. API 호출
    const response = await fetch(url.toString(), {
      headers: { Authorization: `KakaoAK ${apiKey}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) throw new Error("API 키 인증에 실패했습니다.");
      if (response.status === 403) throw new Error("도메인 설정을 확인해주세요.");
      throw new Error(`검색 실패 (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    type KakaoPlaceDocument = {
      id: string;
      place_name: string;
      category_name: string;
      address_name: string;
      road_address_name: string;
      phone: string;
      place_url: string;
      distance?: string; // API가 계산해줌
      x: string;
      y: string;
    };

    const docs: KakaoPlaceDocument[] = Array.isArray(data.documents)
      ? data.documents
      : [];

    // 4. 결과 변환
    const places: PlaceSearchResult[] = docs.map((place) => ({
      id: place.id,
      place_name: place.place_name,
      category_name: place.category_name,
      address_name: place.address_name,
      road_address_name: place.road_address_name,
      phone: place.phone,
      place_url: place.place_url,
      distance: place.distance,
      x: place.x,
      y: place.y,
    }));

    setPlaces(places);
    setShowDropdown(true);
  } catch (err) {
    setError(err instanceof Error ? err.message : "검색 중 오류가 발생했습니다");
    setPlaces([]);
    setShowDropdown(false);
  } finally {
    setIsLoading(false);
  }
}, []);


  const handleKeywordChange = useCallback((newKeyword: string) => {
    setKeyword(newKeyword);
  }, []);

  const handleSearch = useCallback(
    (searchKeyword: string) => {
      searchPlaces(searchKeyword);
    },
    [searchPlaces]
  );

  const handleSearchResultSelect = useCallback(
    (place: PlaceSearchResult) => {
      const placeData: PlaceSelect = {
        placeName: place.place_name,
        address: place.address_name,
        latitude: parseFloat(place.y),
        longitude: parseFloat(place.x),
        placeId: place.id,
      };

      handlePlaceSelect(placeData);
      setShowDropdown(false);
    },
    [handlePlaceSelect]
  );

  // 현재 위치 기반으로 주변 장소 검색
  const handleGetCurrentLocation = useCallback(async () => {
    setIsGettingLocation(true);
    setError(null);

    try {
      // 1. 권한 상태 먼저 확인
      const permissionState = await checkLocationPermission();
      
      if (permissionState === 'denied') {
        // 이미 거부된 경우 - 설정 변경 안내
        throw new Error(
          '위치 권한이 거부되어 있습니다.\n\n권한을 허용하려면:\n' +
          '• Chrome/Edge: 주소창 왼쪽 자물쇠 아이콘 클릭 → 위치 → 허용\n' +
          '• Safari: 설정 → Safari → 웹사이트 → 위치\n' +
          '• Firefox: 주소창 왼쪽 정보 아이콘 클릭 → 권한 → 위치\n\n' +
          '권한 변경 후 다시 시도해주세요.'
        );
      }
      
      // 2. 현재 위치 가져오기 (권한이 'prompt'면 팝업 자동 발생, 'granted'면 바로 가져옴)
      const position = await getCurrentPosition();
      
      const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
      if (!apiKey) {
        throw new Error("API 키가 설정되지 않았습니다");
      }

      // 3. 좌표로 주소 검색 (역 지오코딩)
      const coordUrl = new URL("https://dapi.kakao.com/v2/local/geo/coord2address.json");
      coordUrl.searchParams.set("x", position.longitude.toString());
      coordUrl.searchParams.set("y", position.latitude.toString());

      const coordResponse = await fetch(coordUrl.toString(), {
        headers: { Authorization: `KakaoAK ${apiKey}` },
      });

      if (!coordResponse.ok) {
        throw new Error("주소 정보를 가져올 수 없습니다");
      }

      const coordData = await coordResponse.json();
      
      if (coordData.documents && coordData.documents.length > 0) {
        const document = coordData.documents[0];
        const address = document.address || document.road_address;
        
        if (address) {
          // 현재 위치 정보로 자동 입력
          const placeData: PlaceSelect = {
            placeName: "현재 위치",
            address: address.address_name || address.region_1depth_name + ' ' + address.region_2depth_name + ' ' + address.region_3depth_name,
            latitude: position.latitude,
            longitude: position.longitude,
            placeId: "current_location",
          };

          setCurrentLocation(placeData); // 현재 위치 상태 저장
          handlePlaceSelect(placeData);
          setKeyword("현재 위치");
          
          // 4. 현재 위치 주변 음식점 검색
          const searchUrl = new URL("https://dapi.kakao.com/v2/local/search/category.json");
          searchUrl.searchParams.set("category_group_code", "FD6"); // 음식점 카테고리
          searchUrl.searchParams.set("x", position.longitude.toString());
          searchUrl.searchParams.set("y", position.latitude.toString());
          searchUrl.searchParams.set("radius", "500"); // 500m 반경
          searchUrl.searchParams.set("sort", "distance");

          const searchResponse = await fetch(searchUrl.toString(), {
            headers: { Authorization: `KakaoAK ${apiKey}` },
          });

          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            const docs = Array.isArray(searchData.documents) ? searchData.documents : [];
            
            interface KakaoPlace {
              id: string;
              place_name: string;
              category_name: string;
              address_name: string;
              road_address_name?: string;
              phone?: string;
              place_url?: string;
              distance: string;
              x: string;
              y: string;
            }
            
            const nearbyPlaces: PlaceSearchResult[] = docs.map((place: KakaoPlace) => ({
              id: place.id,
              place_name: place.place_name,
              category_name: place.category_name,
              address_name: place.address_name,
              road_address_name: place.road_address_name || '',
              phone: place.phone || '',
              place_url: place.place_url || '',
              distance: place.distance,
              x: place.x,
              y: place.y,
            }));

            setPlaces(nearbyPlaces);
            setShowDropdown(true);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "현재 위치를 가져올 수 없습니다");
    } finally {
      setIsGettingLocation(false);
    }
  }, [handlePlaceSelect]);

  return {
    keyword,
    setKeyword,
    showDropdown,
    setShowDropdown,
    places,
    isLoading,
    error,
    isGettingLocation,
    currentLocation,
    handleKeywordChange,
    handleSearch,
    handleSearchResultSelect,
    handleGetCurrentLocation,
  } as const;
};

export default usePlaceSearch;
