// 통계 관련 타입들 (현재 hooks에서 사용 중)
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

// 네비게이션 관련 타입들 (추후 네비게이션 컴포넌트에서 사용 예정)
export interface NavigationTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}
