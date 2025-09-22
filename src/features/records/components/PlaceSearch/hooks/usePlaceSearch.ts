import { useCallback, useState } from "react";
import type { PlaceSelect } from "@/features/records/types";
import type { PlaceSearchResult } from "../types";

interface UsePlaceSearchProps {
  onPlaceSelect: (place: PlaceSelect) => void;
}

export const usePlaceSearch = ({ onPlaceSelect }: UsePlaceSearchProps) => {
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [places, setPlaces] = useState<PlaceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    keyword,
    setKeyword,
    showDropdown,
    setShowDropdown,
    places,
    isLoading,
    error,
    handleKeywordChange,
    handleSearch,
    handleSearchResultSelect,
  } as const;
};

export default usePlaceSearch;
