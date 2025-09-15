"use client";

import { useCallback, useState } from "react";
import { SearchInput } from "./components/SearchInput";
import type { PlaceSelect } from "../../types";
import type { PlaceSearchResult } from "./types";
import { haversineDistanceKm, Coords } from "./utils";

interface PlaceSearchProps {
  onPlaceSelect: (place: PlaceSelect) => void;
}

export function PlaceSearch({ onPlaceSelect }: PlaceSearchProps) {
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
      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        searchKeyword
      )}&category_group_code=FD6`;

      // Kakao Places API 호출
      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        if (response.status === 401) {
          throw new Error("API 키 인증에 실패했습니다.");
        } else if (response.status === 403) {
          throw new Error("도메인 설정을 확인해주세요.");
        } else {
          throw new Error(`검색 실패 (${response.status}): ${errorText}`);
        }
      }

      const data = await response.json();

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
      } catch (err) {
        currentCoords = null;
        throw err;
      }

      type KakaoPlaceDocument = {
        id: string;
        place_name: string;
        category_name: string;
        address_name: string;
        road_address_name: string;
        phone: string;
        place_url: string;
        distance?: string;
        x: string; // longitude
        y: string; // latitude
        [key: string]: unknown;
      };

      const docs: KakaoPlaceDocument[] = Array.isArray(data.documents)
        ? data.documents
        : [];

      const withDistances: PlaceSearchResult[] = docs.map((place) => {
        const lat = Number.parseFloat(place.y);
        const lon = Number.parseFloat(place.x);
        let calculatedDistance: number | undefined;

        if (
          currentCoords &&
          !Number.isNaN(lat) &&
          !Number.isNaN(lon) &&
          typeof currentCoords.latitude === "number" &&
          typeof currentCoords.longitude === "number"
        ) {
          const aCoords: Coords = {
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude,
          };
          const bCoords: Coords = { latitude: lat, longitude: lon };
          calculatedDistance = haversineDistanceKm(aCoords, bCoords);
        }

        return {
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
          calculatedDistance,
        } as PlaceSearchResult;
      });

      // Sort by calculatedDistance (closest first). Places without distance go to the end.
      withDistances.sort((a: PlaceSearchResult, b: PlaceSearchResult) => {
        const da =
          typeof a.calculatedDistance === "number"
            ? a.calculatedDistance
            : Infinity;
        const db =
          typeof b.calculatedDistance === "number"
            ? b.calculatedDistance
            : Infinity;
        return da - db;
      });

      setPlaces(withDistances);
      setShowDropdown(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "검색 중 오류가 발생했습니다"
      );
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

  return (
    <div className="space-y-4">
      {/* 검색 에러 표시 */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 border border-red-200">
          <span className="text-sm text-red-800">{error}</span>
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            keyword={keyword}
            showDropdown={showDropdown}
            places={places}
            isLoading={isLoading}
            onKeywordChange={handleKeywordChange}
            onSearch={handleSearch}
            onPlaceSelect={handleSearchResultSelect}
            onDropdownToggle={setShowDropdown}
          />
        </div>
      </div>
    </div>
  );
}
