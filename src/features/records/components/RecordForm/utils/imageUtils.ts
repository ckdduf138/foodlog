/**
 * 이미지를 리사이즈하여 용량을 최적화합니다.
 * @param file 원본 이미지 파일
 * @param maxWidth 최대 너비 (기본값: 1080)
 * @param maxHeight 최대 높이 (기본값: 1080)
 * @param quality 압축 품질 (기본값: 0.8)
 * @returns 리사이즈된 이미지의 Data URL
 */
export const resizeImage = (
  file: File,
  maxWidth: number = 1080,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // 원본 비율 유지하면서 최대 크기 제한
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      // JPEG로 압축하여 용량 최적화
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl);
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * 파일 크기가 제한을 초과하는지 확인합니다.
 * @param file 확인할 파일
 * @param maxSizeMB 최대 크기 (MB 단위, 기본값: 10)
 * @returns 크기 제한 초과 여부
 */
export const validateFileSize = (
  file: File,
  maxSizeMB: number = 10
): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};
