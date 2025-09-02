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
