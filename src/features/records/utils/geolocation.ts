/**
 * Geolocation API를 사용하여 현재 위치를 가져오는 유틸리티
 */

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

/**
 * 현재 위치를 가져오는 함수
 */
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('이 브라우저는 위치 정보를 지원하지 않습니다.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let errorMessage = '위치 정보를 가져올 수 없습니다.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '위치 권한이 거부되었습니다.\n\n권한을 허용하려면:\n' +
              '• Chrome/Edge: 주소창 왼쪽 자물쇠 아이콘 클릭 → 위치 → 허용\n' +
              '• Safari: 설정 → Safari → 웹사이트 → 위치\n' +
              '• Firefox: 주소창 왼쪽 정보 아이콘 클릭 → 권한 → 위치';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '위치 정보를 사용할 수 없습니다. GPS가 활성화되어 있는지 확인해주세요.';
            break;
          case error.TIMEOUT:
            errorMessage = '위치 정보 요청 시간이 초과되었습니다. 다시 시도해주세요.';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true, // 높은 정확도 사용
        timeout: 10000, // 10초 타임아웃
        maximumAge: 0, // 캐시된 위치 사용하지 않음
      }
    );
  });
};

/**
 * 두 좌표 간의 거리를 계산 (Haversine formula)
 * @param lat1 첫 번째 위도
 * @param lon1 첫 번째 경도
 * @param lat2 두 번째 위도
 * @param lon2 두 번째 경도
 * @returns 거리 (미터)
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // 지구 반지름 (미터)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 미터 단위 거리
};

/**
 * 거리를 읽기 쉬운 형태로 포맷
 * @param distance 거리 (미터)
 * @returns 포맷된 거리 문자열
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  }
  return `${(distance / 1000).toFixed(1)}km`;
};

/**
 * 위치 권한 상태 확인
 */
export const checkLocationPermission = async (): Promise<'granted' | 'denied' | 'prompt'> => {
  if (!navigator.permissions) {
    return 'prompt';
  }

  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    return permission.state;
  } catch {
    return 'prompt';
  }
};
