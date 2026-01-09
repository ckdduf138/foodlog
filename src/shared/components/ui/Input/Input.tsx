"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: "h-9 text-sm px-3",
  md: "h-11 text-base px-4",
  lg: "h-13 text-lg px-5",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      size = "md",
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={cn("space-y-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-foreground)]"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base styles
              "w-full rounded-xl",
              "bg-[var(--color-background)]",
              "border border-[var(--color-border)]",
              "text-[var(--color-foreground)]",
              "placeholder:text-[var(--color-muted-foreground)]",
              // Focus
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
              // Transitions
              "transition-all duration-200",
              // Size
              sizeStyles[size],
              // Icons padding
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              // Error state
              hasError && "border-[var(--color-destructive)] focus:ring-[var(--color-destructive)]",
              // Mobile optimizations
              "touch-manipulation",
              // Disabled
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || hint) && (
          <p
            className={cn(
              "text-xs",
              hasError
                ? "text-[var(--color-destructive)]"
                : "text-[var(--color-muted-foreground)]"
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
