import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, Camera, Download } from "lucide-react";
import { saveImageToGallery, generatePhotoFilename } from "@/features/records/utils/photoUtils";

interface Step4PhotoProps {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoPreview: string | null;
}

export const Step4Photo: React.FC<Step4PhotoProps> = ({
  onFormChange,
  photoPreview,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleSaveToGallery = async () => {
    if (!photoPreview) return;
    
    setIsSaving(true);
    try {
      const filename = generatePhotoFilename();
      const success = await saveImageToGallery(photoPreview, filename);
      
      if (success) {
        alert('사진이 갤러리에 저장되었습니다!');
      } else {
        alert('사진 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('사진 저장 오류:', error);
      alert('사진 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label
          className="block text-base font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          음식 사진을 추가해보세요
        </label>

        {/* 갤러리 선택 input (숨김) */}
        <input
          ref={fileInputRef}
          type="file"
          name="photo"
          accept="image/*"
          onChange={onFormChange}
          className="hidden"
        />

        {/* 카메라 촬영 input (숨김) */}
        <input
          ref={cameraInputRef}
          type="file"
          name="photo"
          accept="image/*"
          capture="environment"
          onChange={onFormChange}
          className="hidden"
        />

        {/* 사진 선택 버튼 */}
        {!photoPreview ? (
          <div className="grid grid-cols-2 gap-3">
            {/* 카메라 촬영 버튼 */}
            <button
              type="button"
              onClick={handleCameraClick}
              className="border-2 border-dashed rounded-2xl p-6 transition-all hover:scale-[1.02]"
              style={{ borderColor: "var(--color-border)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="space-y-2">
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                  카메라 촬영
                </p>
                <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                  직접 촬영하기
                </p>
              </div>
            </button>

            {/* 갤러리 선택 버튼 */}
            <button
              type="button"
              onClick={handleGalleryClick}
              className="border-2 border-dashed rounded-2xl p-6 transition-all hover:scale-[1.02]"
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
              <div className="space-y-2">
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-green-500)" }}
                >
                  <UploadCloud className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                  갤러리 선택
                </p>
                <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                  저장된 사진
                </p>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* 사진 미리보기 */}
            <div className="relative w-full aspect-square max-h-96 rounded-2xl overflow-hidden border-2" style={{ borderColor: "var(--color-border)" }}>
              <Image
                src={photoPreview}
                alt="Selected food"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 액션 버튼들 */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleCameraClick}
                className="px-4 py-2 rounded-xl font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--color-muted)",
                  color: "var(--color-foreground)",
                }}
              >
                <Camera className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">재촬영</span>
              </button>
              
              <button
                type="button"
                onClick={handleGalleryClick}
                className="px-4 py-2 rounded-xl font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--color-muted)",
                  color: "var(--color-foreground)",
                }}
              >
                <UploadCloud className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">변경</span>
              </button>
              
              <button
                type="button"
                onClick={handleSaveToGallery}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-50"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
              >
                <Download className="w-4 h-4 mx-auto mb-1" />
                <span className="text-xs">{isSaving ? '저장중...' : '저장'}</span>
              </button>
            </div>
          </div>
        )}
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
