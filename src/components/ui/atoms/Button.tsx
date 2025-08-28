import { ButtonHTMLAttributes, ReactNode } from "react";

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
