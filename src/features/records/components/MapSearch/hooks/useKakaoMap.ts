/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PlaceSelect } from "@/features/records/types";
import { MapSearchState, MapCoordinates, PlaceSearchResult } from "../types";
import {
  isKakaoMapsAvailable,
  getCurrentPosition,
  createMapInstance,
  createMarker,
  clearMarkersAndInfowindows,
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
  });

  const initializeMap = useCallback(
    async (coordinates?: MapCoordinates) => {
      if (!mapContainer.current || state.isMapLoaded) {
        return;
      }

      try {
        const coords = coordinates || DEFAULT_COORDINATES;
        console.log("Initializing map with coordinates:", coords);

        const mapInstance = createMapInstance(mapContainer.current, coords);
        console.log("Map instance created successfully");

        setState((prev) => ({
          ...prev,
          map: mapInstance,
          isMapLoaded: true,
        }));
      } catch (error) {
        console.error("Error creating map instance:", error);
      }
    },
    [state.isMapLoaded]
  );

  const loadMap = useCallback(() => {
    if (!isKakaoMapsAvailable()) {
      console.error("Kakao maps not available");
      return;
    }

    if (state.isMapLoaded && state.map) {
      console.log("Map already loaded");
      return;
    }

    window.kakao.maps.load(async () => {
      console.log("Kakao maps API loaded");

      try {
        const coordinates = await getCurrentPosition();
        initializeMap(coordinates);
      } catch (error) {
        console.log("Using default coordinates");
        initializeMap(DEFAULT_COORDINATES);
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
          setState((prev) => ({
            ...prev,
            places: data.slice(0, 5),
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
    [state.map]
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
    console.log("Script loaded, checking kakao object:", !!window.kakao);
    setState((prev) => ({ ...prev, scriptLoaded: true }));
    loadMap();
  }, [loadMap]);

  const setKeyword = useCallback((keyword: string) => {
    setState((prev) => ({ ...prev, keyword }));
  }, []);

  const setShowDropdown = useCallback((show: boolean) => {
    setState((prev) => ({ ...prev, showDropdown: show }));
  }, []);

  // Check if script is already loaded on mount
  useEffect(() => {
    if (isKakaoMapsAvailable() && !state.scriptLoaded) {
      console.log("Kakao script already loaded, initializing map");
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
  };
};
