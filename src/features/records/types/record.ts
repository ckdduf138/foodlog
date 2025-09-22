import type { BaseEntity } from "@/shared/types";

// 음식 기록 관련 타입들
export interface Location {
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string; // 카카오 맵 장소 ID
  placeName?: string; // 카카오 맵 장소명
}

export interface FoodRecord extends BaseEntity {
  date: string; // YYYY-MM-DD 형식
  time: string; // HH:MM 형식
  restaurantName: string;
  location: Location;
  foodName: string;
  category?: string; // 음식 카테고리 (한식, 중식, 일식 등)
  rating: number; // 1-5 별점
  review: string; // 한줄평
  photo?: string; // base64 이미지 데이터 또는 URL
  tags?: string[]; // 태그 배열
  price?: number; // 가격 정보
}

// 폼 관련 타입들
export interface FoodRecordFormData {
  date: string;
  time: string;
  restaurantName: string;
  location: Partial<Location>;
  foodName: string;
  rating: number;
  review: string;
  photo?: File | string;
  price?: number;
}

// 장소 선택 관련 타입들
export interface PlaceSelect {
  placeName?: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;
}

// 검색 관련 타입들
export interface SearchKeyword extends BaseEntity {
  keyword: string;
  count: number; // 사용 횟수
  lastUsed: Date;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  rating?: number;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
  location?: string;
}
