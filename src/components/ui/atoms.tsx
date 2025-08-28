// Atomic Design Pattern - Atoms (가장 기본적인 UI 요소들)

import { Star } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

// 별점 표시 컴포넌트
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  readonly = true,
  onChange,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex gap-0.5">
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} transition-colors ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          } ${!readonly ? "cursor-pointer hover:text-yellow-300" : ""}`}
          onClick={!readonly ? () => onChange?.(i + 1) : undefined}
        />
      ))}
    </div>
  );
};

// 통계 카드 컴포넌트
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {trend && (
        <div
          className={`text-xs mt-1 ${
            trend.isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
};

// 버튼 컴포넌트 (다양한 variant 지원)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "font-medium transition-all duration-200 rounded-lg flex items-center justify-center gap-2";

  const variantClasses = {
    primary:
      "bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md active:scale-95",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline: "border border-green-500 text-green-600 hover:bg-green-50",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${
        disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

// 로딩 스피너 컴포넌트
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export const LoadingSpinner = ({
  size = "md",
  message,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="text-center py-8">
      <div
        className={`${sizeClasses[size]} border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto`}
      />
      {message && <p className="text-gray-500 mt-2 text-sm">{message}</p>}
    </div>
  );
};

// 뱃지 컴포넌트
interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

export const Badge = ({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
};
