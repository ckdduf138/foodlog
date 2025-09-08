"use client";

import { useState, useCallback } from "react";
import { useKakaoMap } from "./hooks/useKakaoMap";
import { SearchInput } from "./components/SearchInput";
import { MapContainer } from "./components/MapContainer";
import type { PlaceSelect } from "../../types";

interface MapSearchProps {
  onPlaceSelect: (place: PlaceSelect) => void;
  initialPlace?: PlaceSelect;
}

export function MapSearch({ onPlaceSelect, initialPlace }: MapSearchProps) {
  const [selectedPlace, setSelectedPlace] = useState<PlaceSelect | null>(
    initialPlace || null
  );

  const handlePlaceSelect = useCallback(
    (place: PlaceSelect) => {
      setSelectedPlace(place);
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
    (place: any) => {
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
      <SearchInput
        keyword={state.keyword}
        showDropdown={state.showDropdown}
        places={state.places}
        onKeywordChange={handleKeywordChange}
        onSearch={handleSearch}
        onPlaceSelect={handleSearchResultSelect}
        onDropdownToggle={setShowDropdown}
      />

      <MapContainer mapContainer={mapContainer} onScriptLoad={onScriptLoad} />
    </div>
  );
}
