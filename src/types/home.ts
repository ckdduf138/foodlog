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
