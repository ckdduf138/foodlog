export interface PlaceSearchResult {
  id: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  place_url: string;
  distance?: string; // Kakao API에서 제공하는 거리 (미터 단위)
  x: string; // longitude
  y: string; // latitude
  calculatedDistance?: number; // 계산된 거리 (km)
}
