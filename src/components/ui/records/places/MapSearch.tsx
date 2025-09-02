"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { PlaceSelect } from "./PlaceSearch";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapSearchProps {
  onPlaceSelect: (place: PlaceSelect) => void;
}

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&libraries=services&autoload=false`;

const MapSearch = ({ onPlaceSelect }: MapSearchProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infowindows, setInfowindows] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const initializeMap = (lat: number, lng: number) => {
    if (!mapContainer.current) {
      console.log("Map container not found");
      return;
    }

    console.log("Initializing map with coordinates:", lat, lng);
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    try {
      const mapInstance = new window.kakao.maps.Map(
        mapContainer.current,
        options
      );
      console.log("Map instance created successfully");
      setMap(mapInstance);
    } catch (error) {
      console.error("Error creating map instance:", error);
    }
  };

  const onLoadKakaoMap = () => {
    console.log("Script loaded, checking kakao object:", !!window.kakao);

    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao maps not available");
      return;
    }

    window.kakao.maps.load(() => {
      console.log("Kakao maps API loaded");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Geolocation success:", position.coords);
            initializeMap(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.log("Geolocation failed:", error);
            initializeMap(37.566826, 126.9786567); // Seoul City Hall
          }
        );
      } else {
        console.log("Geolocation not supported");
        initializeMap(37.566826, 126.9786567); // Seoul City Hall
      }
    });
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword.trim() !== "") {
        searchPlacesByKeyword(keyword);
        setShowDropdown(true);
      } else {
        setPlaces([]);
        setShowDropdown(false);
        markers.forEach((marker) => marker.setMap(null));
        infowindows.forEach((infowindow) => infowindow.close());
      }
    }, 300); // 300ms delay for debouncing

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword, map]);

  const searchPlacesByKeyword = (searchKeyword: string) => {
    if (!map || !searchKeyword.trim()) {
      setPlaces([]);
      markers.forEach((marker) => marker.setMap(null));
      infowindows.forEach((infowindow) => infowindow.close());
      return;
    }
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, placesSearchCB, {
      location: map.getCenter(),
    });
  };

  const placesSearchCB = (data: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data);
      markers.forEach((marker) => marker.setMap(null));
      infowindows.forEach((infowindow) => infowindow.close());

      const newMarkers: any[] = [];
      const newInfowindows: any[] = [];

      if (data.length > 0) {
        const bounds = new window.kakao.maps.LatLngBounds();
        data.forEach((place: any) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
          });

          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(map, marker);
          });
          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close();
          });
          window.kakao.maps.event.addListener(marker, "click", () => {
            handlePlaceSelect(place);
          });

          newMarkers.push(marker);
          newInfowindows.push(infowindow);
          bounds.extend(position);
        });
        map.setBounds(bounds);
      }

      setMarkers(newMarkers);
      setInfowindows(newInfowindows);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      setPlaces([]);
      markers.forEach((marker) => marker.setMap(null));
      infowindows.forEach((infowindow) => infowindow.close());
    }
  };

  const handlePlaceSelect = (place: any) => {
    const placeInfo = {
      placeId: place.id,
      placeName: place.place_name,
      address: place.road_address_name || place.address_name,
      latitude: Number(place.y),
      longitude: Number(place.x),
    };
    setKeyword(place.place_name); // 선택된 장소명으로 검색창 업데이트
    setShowDropdown(false); // 드롭다운 숨기기
    onPlaceSelect(placeInfo);
  };

  const handlePlaceClick = (place: any, index: number) => {
    if (!map) return;
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.panTo(position);
    infowindows.forEach((infowindow, i) => {
      if (i === index) {
        infowindow.open(map, markers[i]);
      } else {
        infowindow.close();
      }
    });
  };

  return (
    <div>
      <Script
        src={KAKAO_SDK_URL}
        strategy="afterInteractive"
        onLoad={onLoadKakaoMap}
      />
      <div className="relative mb-3">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="음식점, 카페 등 장소를 검색하세요"
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
          onFocus={() => {
            if (places.length > 0) setShowDropdown(true);
          }}
        />
        {showDropdown && places.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-xl shadow-lg z-10 max-h-48 overflow-y-auto">
            {places.map((place, index) => (
              <div
                key={place.id}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => {
                  handlePlaceClick(place, index);
                  handlePlaceSelect(place);
                }}
              >
                <div className="font-medium text-sm">{place.place_name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {place.category_group_name && (
                    <span className="text-blue-600">
                      {place.category_group_name}
                    </span>
                  )}
                  {place.category_group_name && " · "}
                  {place.road_address_name || place.address_name}
                </div>
                {place.distance && (
                  <div className="text-xs text-gray-400 mt-1">
                    거리: {place.distance}m
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div ref={mapContainer} className="w-full h-[40vh] rounded-xl" />
    </div>
  );
};

export default MapSearch;
