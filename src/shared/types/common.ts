// 공통 타입 정의
export interface BaseEntity {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
}

// API 응답 타입들
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
