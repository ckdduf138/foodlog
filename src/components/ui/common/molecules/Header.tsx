interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode; // children 속성 추가
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export const Header = ({
  title,
  subtitle,
  icon,
  children, // children prop 받기
  action,
}: HeaderProps) => {
  return (
    <header
      className="shadow-sm border-b w-full self-stretch"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="px-4 py-2 w-full">
        <div className="flex items-center justify-between w-full gap-2 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 max-w-full">
            {icon && (
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  minWidth: 32,
                  minHeight: 32,
                  color: "var(--color-green-600)",
                }}
              >
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1 max-w-full">
              <h1
                className="text-lg sm:text-2xl font-bold truncate max-w-full"
                style={{ color: "var(--color-foreground)" }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className="text-xs sm:text-sm mt-0.5 truncate max-w-full"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {children}
            {action && (
              <button
                onClick={action.onClick}
                className="text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow-md active:scale-95 text-xs sm:text-base flex-shrink-0"
                style={{
                  backgroundColor: "var(--color-green-500)",
                  maxWidth: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-green-600)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-green-500)";
                }}
              >
                {action.icon}
                <span className="hidden xs:inline sm:inline max-w-full truncate">
                  {action.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
