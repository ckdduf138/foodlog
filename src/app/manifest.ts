import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FoodLog - 나만의 음식 기록 다이어리',
    short_name: 'FoodLog',
    description:
      '맛집을 기록하고 추억하세요. 위치, 사진, 별점, 가격, 메모까지 한 곳에서 관리하는 개인 음식 기록 앱.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    orientation: 'portrait',
    scope: '/',
    lang: 'ko',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    categories: ['food', 'lifestyle', 'productivity'],
    shortcuts: [
      {
        name: '새 기록 추가',
        short_name: '새 기록',
        description: '음식 기록을 빠르게 추가합니다',
        url: '/records/new',
        icons: [
          {
            src: '/icon.svg',
            sizes: '96x96',
          },
        ],
      },
      {
        name: '내 기록 보기',
        short_name: '기록',
        description: '저장된 음식 기록을 확인합니다',
        url: '/records',
        icons: [
          {
            src: '/icon.svg',
            sizes: '96x96',
          },
        ],
      },
      {
        name: '통계 보기',
        short_name: '통계',
        description: '음식 기록 통계를 확인합니다',
        url: '/stats',
        icons: [
          {
            src: '/icon.svg',
            sizes: '96x96',
          },
        ],
      },
    ],
  };
}
