import React from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2 } from "lucide-react";

interface Step4PhotoProps {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoPreview: string | null;
}

export const Step4Photo: React.FC<Step4PhotoProps> = ({
  onFormChange,
  photoPreview,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label
          className="block text-base font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          음식 사진을 추가해보세요
        </label>

        <div className="relative group">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={onFormChange}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="cursor-pointer block border-2 border-dashed rounded-3xl text-center transition-all duration-300 group-hover:scale-[1.02] overflow-hidden"
            style={{ borderColor: "var(--color-border)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-green-500)";
              e.currentTarget.style.backgroundColor = "rgba(34, 197, 94, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {photoPreview ? (
              <div className="relative w-full aspect-square max-h-64">
                <Image
                  src={photoPreview}
                  alt="Selected food"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                  <p className="text-white font-semibold">사진 변경하기</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-8">
                <div
                  className="w-10 h-10 mx-auto rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "var(--color-green-500)" }}
                >
                  <UploadCloud className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold transition-colors"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    사진 추가하기
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    클릭하여 사진을 선택하세요
                  </p>
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      <div
        className="rounded-2xl p-3"
        style={{
          backgroundColor: "var(--color-green-100)",
          border: "1px solid var(--color-green-200)",
        }}
      >
        <div className="flex items-center space-x-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-green-500)" }}
          >
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-green-700)" }}
          >
            사진은 나중에 추가하거나 변경할 수도 있어요
          </p>
        </div>
      </div>
    </div>
  );
};
