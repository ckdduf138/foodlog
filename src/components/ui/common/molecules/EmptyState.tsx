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
    <div className="text-center py-12">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3
        className="text-lg font-medium mb-2"
        style={{ color: "var(--color-foreground)" }}
      >
        {title}
      </h3>
      <p
        className="mb-6 max-w-sm mx-auto"
        style={{ color: "var(--color-muted-foreground)" }}
      >
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
          style={{ backgroundColor: "var(--color-green-500)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-green-600)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-green-500)";
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
