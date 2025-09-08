import React from "react";

interface PriceInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChange,
  placeholder = "15,000",
  className = "",
}) => {
  // 숫자를 콤마가 포함된 문자열로 변환
  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  // 콤마가 포함된 문자열을 숫자로 변환
  const parseNumber = (str: string): number | undefined => {
    const cleaned = str.replace(/[^0-9]/g, "");
    return cleaned === "" ? undefined : parseInt(cleaned, 10);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseNumber(inputValue);
    onChange(numericValue);
  };

  const displayValue = value ? formatNumber(value) : "";

  return (
    <div className="relative">
      <div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base font-semibold z-10"
        style={{ color: "var(--color-muted-foreground)" }}
      >
        ₩
      </div>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-4 text-base border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 ${className}`}
        style={{
          backgroundColor: "var(--color-background)",
          borderColor: "var(--color-border)",
          color: "var(--color-foreground)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--color-green-500)";
          e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--color-border)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
};
