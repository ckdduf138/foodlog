"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      hint,
      showCount = false,
      maxLength,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--color-foreground)]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            value={value}
            maxLength={maxLength}
            className={cn(
              // Base styles
              "w-full min-h-[120px] rounded-xl p-4",
              "bg-[var(--color-background)]",
              "border border-[var(--color-border)]",
              "text-[var(--color-foreground)]",
              "placeholder:text-[var(--color-muted-foreground)]",
              // Focus
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
              // Transitions
              "transition-all duration-200",
              // Resize
              "resize-none",
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
        </div>

        <div className="flex items-center justify-between">
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
          
          {showCount && maxLength && (
            <p className="text-xs text-[var(--color-muted-foreground)] ml-auto">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
