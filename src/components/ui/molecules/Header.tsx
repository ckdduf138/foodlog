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
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-green-600">{icon}</div>}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95"
            >
              {action.icon}
              {action.label}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
