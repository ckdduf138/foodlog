/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PlaceSelect } from "@/features/records/types";
import { MapSearchState, MapCoordinates, PlaceSearchResult } from "../types";
import {
  isKakaoMapsAvailable,
  getCurrentPosition,
  refreshCurrentPosition,
  createMapInstance,
  createMarker,
  createCurrentLocationMarker,
  clearMarkersAndInfowindows,
  sortPlacesByDistance,
  DEFAULT_COORDINATES,
} from "../utils";

export const useKakaoMap = (onPlaceSelect: (place: PlaceSelect) => void) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<MapSearchState>({
    map: null,
    markers: [],
    infowindows: [],
    places: [],
    keyword: "",
    showDropdown: false,
    isMapLoaded: false,
    scriptLoaded: false,
    currentLocation: null,
    currentLocationMarker: null,
    isLoadingLocation: false,
    locationError: null,
  });

  const initializeMap = useCallback(
    async (coordinates?: MapCoordinates) => {
      if (!mapContainer.current || state.isMapLoaded) {
        return;
      }

      try {
        const coords = coordinates || DEFAULT_COORDINATES;
        const mapInstance = createMapInstance(mapContainer.current, coords);

        // 현재 위치 마커 생성
        let currentLocationMarker = null;
        if (coordinates) {
          const { marker } = createCurrentLocationMarker(
            mapInstance,
            coordinates
          );
          currentLocationMarker = marker;
        }

        setState((prev) => ({
          ...prev,
          map: mapInstance,
          isMapLoaded: true,
          currentLocation: coordinates || null,
          currentLocationMarker,
        }));
      } catch (error) {
        console.error("Error creating map instance:", error);
      }
    },
    [state.isMapLoaded]
  );

  const loadMap = useCallback(() => {
    if (!isKakaoMapsAvailable()) {
      setState((prev) => ({
        ...prev,
        isLoadingLocation: false,
        locationError: "카카오 맵을 불러올 수 없습니다",
      }));
      return;
    }

    if (state.isMapLoaded && state.map) {
      setState((prev) => ({
        ...prev,
        isLoadingLocation: false,
      }));
      return;
    }

    window.kakao.maps.load(async () => {
      try {
        const coordinates = await getCurrentPosition();
        initializeMap(coordinates);
        setState((prev) => ({
          ...prev,
          isLoadingLocation: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          locationError:
            "현재 위치를 확인하는 중입니다. 위치 권한을 허용해주세요.",
        }));

        // 기본 좌표로 지도는 표시하되 현재 위치는 계속 시도
        initializeMap(DEFAULT_COORDINATES);

        // 5초 후 재시도
        setTimeout(async () => {
          try {
            const coordinates = await getCurrentPosition();

            // 성공시 현재 위치 마커 추가 및 지도 이동
            if (state.map) {
              const { marker } = createCurrentLocationMarker(
                state.map,
                coordinates
              );
              const moveLatLon = new window.kakao.maps.LatLng(
                coordinates.latitude,
                coordinates.longitude
              );
              state.map.setCenter(moveLatLon);
              state.map.setLevel(2);

              setState((prev) => ({
                ...prev,
                currentLocation: coordinates,
                currentLocationMarker: marker,
                isLoadingLocation: false,
                locationError: null,
              }));
            }
          } catch (retryError) {
            setState((prev) => ({
              ...prev,
              isLoadingLocation: false,
              locationError:
                "현재 위치를 확인할 수 없습니다. Navigation 버튼으로 다시 시도해주세요.",
            }));
          }
        }, 5000);
      }
    });
  }, [state.isMapLoaded, state.map, initializeMap]);

  const searchPlaces = useCallback(
    (keyword: string) => {
      if (!state.map || !keyword.trim()) {
        setState((prev) => ({ ...prev, places: [], showDropdown: false }));
        return;
      }

      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data: PlaceSearchResult[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          let sortedPlaces = data.slice(0, 10); // 더 많은 결과를 가져와서 정렬

          // 현재 위치가 있으면 거리 기반으로 정렬
          if (state.currentLocation) {
            sortedPlaces = sortPlacesByDistance(
              sortedPlaces,
              state.currentLocation
            );
          }

          setState((prev) => ({
            ...prev,
            places: sortedPlaces.slice(0, 5), // 최종적으로 5개만 표시
            showDropdown: true,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            places: [],
            showDropdown: false,
          }));
        }
      });
    },
    [state.map, state.currentLocation]
  );

  const selectPlace = useCallback(
    (place: PlaceSearchResult) => {
      if (!state.map) return;

      // Clear existing markers and infowindows
      const { markers, infowindows } = clearMarkersAndInfowindows(
        state.markers,
        state.infowindows
      );

      // Create new marker for selected place
      const handlePlaceSelect = () => {
        const placeData: PlaceSelect = {
          placeName: place.place_name,
          address: place.address_name,
          latitude: parseFloat(place.y),
          longitude: parseFloat(place.x),
          placeId: place.id,
        };
        onPlaceSelect(placeData);
      };

      const { marker, infowindow } = createMarker(
        state.map,
        place,
        handlePlaceSelect
      );

      // Move map to selected place
      const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
      state.map.setCenter(moveLatLon);

      setState((prev) => ({
        ...prev,
        markers: [marker],
        infowindows: [infowindow],
        keyword: place.place_name,
        showDropdown: false,
      }));
    },
    [state.map, state.markers, state.infowindows, onPlaceSelect]
  );

  const onScriptLoad = useCallback(() => {
    setState((prev) => ({
      ...prev,
      scriptLoaded: true,
      isLoadingLocation: true,
      locationError: null,
    }));
    loadMap();
  }, [loadMap]);

  const setKeyword = useCallback((keyword: string) => {
    setState((prev) => ({ ...prev, keyword }));
  }, []);

  const setShowDropdown = useCallback((show: boolean) => {
    setState((prev) => ({ ...prev, showDropdown: show }));
  }, []);

  // 현재 위치 새로고침
  const refreshLocation = useCallback(async () => {
    if (!state.map) {
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoadingLocation: true,
      locationError: null,
    }));

    try {
      const newLocation = await refreshCurrentPosition();

      // 기존 현재 위치 마커 제거
      if (state.currentLocationMarker) {
        state.currentLocationMarker.setMap(null);
      }

      // 새로운 현재 위치 마커 생성
      const { marker } = createCurrentLocationMarker(state.map, newLocation);

      // 지도 중심을 새로운 위치로 이동
      const moveLatLon = new window.kakao.maps.LatLng(
        newLocation.latitude,
        newLocation.longitude
      );
      state.map.setCenter(moveLatLon);
      state.map.setLevel(2);

      setState((prev) => ({
        ...prev,
        currentLocation: newLocation,
        currentLocationMarker: marker,
        isLoadingLocation: false,
        locationError: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoadingLocation: false,
        locationError: "위치 정보를 가져올 수 없습니다",
      }));
    }
  }, [state.map, state.currentLocationMarker]);

  // Check if script is already loaded on mount
  useEffect(() => {
    if (isKakaoMapsAvailable() && !state.scriptLoaded) {
      setState((prev) => ({
        ...prev,
        isLoadingLocation: true,
        locationError: null,
      }));
      onScriptLoad();
    }
  }, [state.scriptLoaded, onScriptLoad]);

  return {
    mapContainer,
    state,
    searchPlaces,
    selectPlace,
    onScriptLoad,
    setKeyword,
    setShowDropdown,
    refreshLocation,
  };
};
