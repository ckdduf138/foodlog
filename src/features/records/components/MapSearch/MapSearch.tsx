"use client";

import { useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useKakaoMap } from "./hooks/useKakaoMap";
import { SearchInput } from "./components/SearchInput";
import { MapContainer } from "./components/MapContainer";
import type { PlaceSelect } from "../../types";
import type { PlaceSearchResult } from "./types";

interface MapSearchProps {
  onPlaceSelect: (place: PlaceSelect) => void;
}

export function MapSearch({ onPlaceSelect }: MapSearchProps) {
  const handlePlaceSelect = useCallback(
    (place: PlaceSelect) => {
      onPlaceSelect(place);
    },
    [onPlaceSelect]
  );

  const {
    mapContainer,
    state,
    searchPlaces,
    selectPlace,
    onScriptLoad,
    onScriptError,
    setKeyword,
    setShowDropdown,
  } = useKakaoMap(handlePlaceSelect);

  const handleKeywordChange = useCallback(
    (keyword: string) => {
      setKeyword(keyword);
    },
    [setKeyword]
  );

  const handleSearch = useCallback(
    (keyword: string) => {
      searchPlaces(keyword);
    },
    [searchPlaces]
  );

  const handleSearchResultSelect = useCallback(
    (place: PlaceSearchResult) => {
      // 먼저 지도에 표시
      selectPlace(place);

      // 그리고 상위 컴포넌트에 알림
      const placeData: PlaceSelect = {
        placeName: place.place_name,
        address: place.address_name,
        latitude: parseFloat(place.y),
        longitude: parseFloat(place.x),
        placeId: place.id,
      };

      handlePlaceSelect(placeData);
    },
    [selectPlace, handlePlaceSelect]
  );

  return (
    <div className="space-y-4">
      {/* 위치 상태 표시 */}
      {state.isLoadingLocation && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-blue-50 border border-blue-200">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <div className="text-sm text-blue-800">
            <span className="font-semibold">위치 확인 중...</span> GPS 권한을
            허용하면 정확한 위치를 표시할 수 있습니다.
          </div>
        </div>
      )}

      {!state.isLoadingLocation && state.locationError && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-yellow-50 border border-yellow-200">
          <AlertCircle className="w-4 h-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">{state.locationError}</span>
        </div>
      )}

      {/* 지도 로딩 에러 표시 */}
      {state.mapError && (
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-800">
              {state.mapError}
            </span>
          </div>
          <div className="text-sm text-red-700">
            <p>• 인터넷 연결을 확인해주세요</p>
            <p>• HTTPS 환경에서 접속해주세요</p>
            <p>• 잠시 후 다시 시도해주세요</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            keyword={state.keyword}
            showDropdown={state.showDropdown}
            places={state.places}
            onKeywordChange={handleKeywordChange}
            onSearch={handleSearch}
            onPlaceSelect={handleSearchResultSelect}
            onDropdownToggle={setShowDropdown}
          />
        </div>
      </div>

      <MapContainer
        mapContainer={mapContainer}
        onScriptLoad={onScriptLoad}
        onScriptError={onScriptError}
      />
    </div>
  );
}
