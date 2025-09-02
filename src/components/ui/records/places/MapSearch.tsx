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
  const [selectedPlace, setSelectedPlace] = useState<PlaceSelect | null>(null);

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const initializeMap = (lat: number, lng: number) => {
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        setMap(mapInstance);
        searchPlaces(mapInstance);
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            initializeMap(position.coords.latitude, position.coords.longitude);
          },
          () => {
            // Geolocation failed, default to a fallback location (e.g., Seoul City Hall)
            initializeMap(37.566826, 126.9786567);
          }
        );
      } else {
        // Geolocation not supported
        initializeMap(37.566826, 126.9786567);
      }
    });
  };

  const searchPlaces = (mapInstance: any) => {
    if (!mapInstance) return;

    const ps = new window.kakao.maps.services.Places(mapInstance);
    ps.categorySearch("FD6", placesSearchCB, { useMapBounds: true }); // FD6: 음식점
  };

  const placesSearchCB = (data: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // Clear previous markers
      markers.forEach((marker) => marker.setMap(null));

      const newMarkers = data.map((place: any) => {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(place.y, place.x),
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
          const placeInfo = {
            placeId: place.id,
            placeName: place.place_name,
            address: place.road_address_name || place.address_name,
            latitude: Number(place.y),
            longitude: Number(place.x),
          };
          setSelectedPlace(placeInfo);
          onPlaceSelect(placeInfo);
        });

        return marker;
      });
      setMarkers(newMarkers);
    }
  };

  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, "dragend", () => {
        searchPlaces(map);
      });
    }
  }, [map, searchPlaces]);

  return (
    <>
      <Script
        src={KAKAO_SDK_URL}
        strategy="afterInteractive"
        onLoad={onLoadKakaoMap}
      />
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "300px", borderRadius: "8px" }}
      ></div>
      {selectedPlace && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg text-sm">
          <p className="font-semibold text-green-800">
            선택된 가게: {selectedPlace.placeName}
          </p>
          <p className="text-xs text-green-600">{selectedPlace.address}</p>
        </div>
      )}
    </>
  );
};

export default MapSearch;
