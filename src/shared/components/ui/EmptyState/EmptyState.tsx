import { cn } from "@/shared/utils";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-8 px-4 animate-fade-in">
      {/* Icon */}
      <div className="mb-5 flex justify-center">{icon}</div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-[var(--color-muted-foreground)] mb-6 max-w-xs mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            "inline-flex items-center gap-2",
            "px-6 py-3 rounded-xl",
            "bg-[var(--color-primary)] text-white",
            "font-medium text-sm",
            "hover:bg-[var(--color-green-700)]",
            "active:scale-95",
            "transition-all duration-200",
            "shadow-sm hover:shadow-md",
            "touch-manipulation"
          )}
        >
          <Plus className="w-4 h-4" />
          {action.label}
        </button>
      )}
    </div>
  );
};
