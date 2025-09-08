import { useState, useEffect } from "react";
import { resizeImage, validateFileSize } from "../utils/imageUtils";

export const usePhotoHandler = (
  photo: File | string | undefined,
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (photo && typeof photo !== "string") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(photo);
    } else if (typeof photo === "string") {
      setPhotoPreview(photo);
    }
  }, [photo]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange(e);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 파일 크기 체크 (10MB 제한)
      if (!validateFileSize(file, 10)) {
        alert("사진 크기가 너무 큽니다. 10MB 이하의 사진을 선택해주세요.");
        return;
      }

      try {
        // 모바일 최적화된 해상도로 리사이즈
        const resizedDataUrl = await resizeImage(file, 1080, 1080, 0.8);
        setPhotoPreview(resizedDataUrl);
      } catch (error) {
        console.error("이미지 처리 중 오류:", error);
        // 오류 시 원본 이미지 사용
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setPhotoPreview(null);
    }
  };

  return {
    photoPreview,
    handlePhotoChange,
  };
};
