/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapCoordinates, KakaoSearchResult } from "./types";

export const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&libraries=services&autoload=false`;

export const DEFAULT_COORDINATES: MapCoordinates = {
  latitude: 37.566826,
  longitude: 126.9786567, // Seoul City Hall
};

export const isKakaoMapsAvailable = (): boolean => {
  return typeof window !== "undefined" && !!window.kakao && !!window.kakao.maps;
};

export const getCurrentPosition = (): Promise<MapCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Geolocation success:", position.coords);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log("Geolocation failed:", error);
        reject(error);
      }
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
    level: 3,
  };

  return new window.kakao.maps.Map(container, options);
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
