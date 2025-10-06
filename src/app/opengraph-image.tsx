import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'FoodLog - 나만의 음식 기록 다이어리';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
          }}
        >
          🍽️ FoodLog
        </div>
        <div
          style={{
            fontSize: 48,
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: 30,
            fontWeight: 600,
          }}
        >
          나만의 음식 기록 다이어리
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.85)',
            textAlign: 'center',
          }}
        >
          맛집을 기록하고 추억하세요
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
