// 공통 타입 정의
export interface BaseEntity {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
}

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

// 검색 키워드 타입
export interface SearchKeyword extends BaseEntity {
  keyword: string;
  count: number; // 사용 횟수
  lastUsed: Date;
}

// UI 컴포넌트 관련 타입들
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type Size = "sm" | "md" | "lg";
export type BadgeVariant = "default" | "success" | "warning" | "error";

// 네비게이션 관련 타입들
export interface NavigationTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

// 통계 관련 타입들
export interface Statistics {
  totalRecords: number;
  monthlyRecords: number;
  averageRating: number;
  favoriteRestaurant?: string;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
  ratingDistribution: Array<{
    rating: number;
    count: number;
  }>;
}

// API 응답 타입들
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 폼 관련 타입들
export interface FoodRecordFormData {
  date: string;
  time: string;
  restaurantName: string;
  location: Partial<Location>;
  foodName: string;
  category: string;
  rating: number;
  review: string;
  photo?: File | string;
  tags: string[];
  price?: number;
  // companions removed
}

// 필터/검색 관련 타입들
export interface SearchFilters {
  query?: string;
  category?: string;
  rating?: number;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
  location?: string;
}

export interface SortOption {
  field: keyof FoodRecord;
  direction: "asc" | "desc";
  label: string;
}

// 설정 관련 타입들
export interface UserSettings {
  notifications: {
    mealReminders: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    shareLocation: boolean;
    sharePhotos: boolean;
  };
  display: {
    theme: "light" | "dark" | "system";
    language: "ko" | "en";
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: "daily" | "weekly" | "monthly";
  };
}
