interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export const Header = ({ title, subtitle, icon, action }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 w-full max-w-md self-stretch">
      <div className="px-4 py-2 sm:py-4 w-full">
        <div className="flex items-center justify-between w-full gap-2 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 max-w-full">
            {icon && (
              <div
                className="text-green-600 flex-shrink-0 flex items-center justify-center"
                style={{ minWidth: 32, minHeight: 32 }}
              >
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1 max-w-full">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate max-w-full">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate max-w-full">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow-md active:scale-95 text-xs sm:text-base flex-shrink-0"
              style={{ maxWidth: "100%" }}
            >
              {action.icon}
              <span className="hidden xs:inline sm:inline max-w-full truncate">
                {action.label}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
