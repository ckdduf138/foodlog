/**
 * 이미지 파일을 갤러리에 저장하는 유틸리티 함수
 */

/**
 * Canvas를 사용하여 이미지를 다운로드 가능한 형태로 변환
 */
export const saveImageToGallery = async (imageDataUrl: string, filename: string = 'foodlog-photo.jpg'): Promise<boolean> => {
  try {
    // Data URL을 Blob으로 변환
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();

    // 브라우저 다운로드 지원 확인
    if ('download' in HTMLAnchorElement.prototype) {
      // 다운로드 링크 생성
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      // 임시로 DOM에 추가하고 클릭
      document.body.appendChild(link);
      link.click();
      
      // 정리
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    }

    // PWA 환경에서 File System Access API 사용 (지원되는 경우)
    if ('showSaveFilePicker' in window) {
      try {
        interface FilePickerOptions {
          suggestedName: string;
          types: Array<{
            description: string;
            accept: Record<string, string[]>;
          }>;
        }
        
        const windowWithPicker = window as Window & {
          showSaveFilePicker: (options: FilePickerOptions) => Promise<{
            createWritable: () => Promise<{
              write: (data: Blob) => Promise<void>;
              close: () => Promise<void>;
            }>;
          }>;
        };
        
        const handle = await windowWithPicker.showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: 'Images',
            accept: { 'image/jpeg': ['.jpg', '.jpeg'] }
          }]
        });
        
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        
        return true;
      } catch (err) {
        // 사용자가 취소한 경우 무시
        if ((err as Error).name === 'AbortError') {
          return false;
        }
        throw err;
      }
    }

    // 모바일에서는 Share API 사용
    if (navigator.share && navigator.canShare) {
      const file = new File([blob], filename, { type: 'image/jpeg' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: '음식 사진',
          text: 'FoodLog에서 촬영한 사진'
        });
        return true;
      }
    }

    console.warn('갤러리 저장 기능이 지원되지 않는 환경입니다.');
    return false;
  } catch (error) {
    console.error('이미지 저장 실패:', error);
    return false;
  }
};

/**
 * 파일을 Base64 Data URL로 변환
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * 이미지 압축 (옵션)
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1920,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // 비율 유지하면서 크기 조정
        if (width > height) {
          if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

/**
 * 현재 날짜와 시간을 기반으로 파일명 생성
 */
export const generatePhotoFilename = (): string => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `foodlog-${timestamp}.jpg`;
};
