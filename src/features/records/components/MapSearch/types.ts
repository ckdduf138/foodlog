/* eslint-disable @typescript-eslint/no-explicit-any */

// Kakao Maps API 타입 정의
declare global {
  interface Window {
    kakao: any;
  }
}

export interface KakaoMapInstance {
  map: any;
  markers: any[];
  infowindows: any[];
}

export interface KakaoSearchResult {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  place_url: string;
  distance: string;
  x: string; // longitude
  y: string; // latitude
}

export interface PlaceSearchResult {
  id: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  place_url: string;
  x: string; // longitude
  y: string; // latitude
  calculatedDistance?: number; // 계산된 거리 (km)
}

export interface MapSearchState {
  map: any;
  markers: any[];
  infowindows: any[];
  places: PlaceSearchResult[];
  keyword: string;
  showDropdown: boolean;
  isMapLoaded: boolean;
  scriptLoaded: boolean;
  currentLocation: MapCoordinates | null;
  currentLocationMarker: any;
  isLoadingLocation: boolean;
  locationError: string | null;
  mapError: string | null;
}

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}
