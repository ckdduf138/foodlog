# SEO 최적화 가이드

## 개요
FoodLog 앱의 검색 엔진 최적화(SEO)를 위한 구현 가이드입니다.

## 구현 내역

### 1. 메타데이터 최적화 (`src/app/layout.tsx`)

#### 기본 메타데이터
```typescript
- title: 템플릿 방식으로 각 페이지마다 커스터마이징
- description: 앱의 핵심 기능과 가치 설명
- keywords: 음식 기록, 맛집 다이어리 등 관련 키워드
- authors, creator, publisher: 앱 제작자 정보
```

#### Open Graph (페이스북, 카카오톡 등)
```typescript
- type: website
- locale: ko_KR
- url: 앱 주소
- title, description: 소셜 미디어 공유 시 표시될 내용
- images: OG 이미지 (1200x630)
```

#### Twitter Card
```typescript
- card: summary_large_image
- 트위터 공유 시 큰 이미지로 표시
```

#### Robots 설정
```typescript
- index: true (검색 엔진 색인 허용)
- follow: true (링크 따라가기 허용)
- googleBot: 구글 봇 전용 설정
  - max-video-preview: -1 (무제한)
  - max-image-preview: large (큰 이미지)
  - max-snippet: -1 (무제한 스니펫)
```

### 2. robots.txt (`public/robots.txt`)
```
User-agent: *
Allow: / (모든 페이지 크롤링 허용)
Allow: /home, /records, /stats, /settings
Disallow: /api/ (API 라우트는 색인 제외)
Sitemap: 사이트맵 위치 명시
```

### 3. sitemap.xml (`src/app/sitemap.ts`)
동적으로 생성되는 XML 사이트맵:
- `/` (홈페이지) - priority: 1.0
- `/home` - priority: 0.9
- `/records` - priority: 0.9
- `/records/new` - priority: 0.8
- `/stats` - priority: 0.7
- `/settings` - priority: 0.5

각 URL에 `lastModified`, `changeFrequency` 정보 포함

### 4. Open Graph 이미지 (`src/app/opengraph-image.tsx`)
- Next.js의 ImageResponse API 사용
- 동적으로 1200x630 OG 이미지 생성
- 그라디언트 배경 + FoodLog 브랜딩
- 자동으로 `/opengraph-image` 엔드포인트 생성

### 5. PWA Manifest (`src/app/manifest.ts`)
TypeScript로 작성된 동적 manifest:
```typescript
- name, short_name: 앱 이름
- description: 앱 설명
- icons: 앱 아이콘
- shortcuts: 빠른 실행 단축키 (새 기록, 기록 보기, 통계)
- categories: food, lifestyle, productivity
```

### 6. JSON-LD 구조화된 데이터
Schema.org WebApplication 타입:
```json
{
  "@type": "WebApplication",
  "name": "FoodLog",
  "applicationCategory": "LifestyleApplication",
  "offers": { "price": "0" },
  "featureList": [...],
  "softwareVersion": "1.0.0"
}
```

## 배포 후 설정 필요 사항

### 1. Google Search Console
1. https://search.google.com/search-console 접속
2. 속성 추가: `https://foodlog.vercel.app`
3. 소유권 확인:
   ```typescript
   // src/app/layout.tsx
   verification: {
     google: 'your-verification-code-here',
   }
   ```
4. 사이트맵 제출: `https://foodlog.vercel.app/sitemap.xml`

### 2. Vercel 환경 변수
실제 배포 URL로 변경:
```bash
NEXT_PUBLIC_APP_URL=https://foodlog.vercel.app
```

### 3. 카카오 디벨로퍼스
Open Graph 이미지 확인:
1. https://developers.kakao.com/tool/debugger/sharing 접속
2. 앱 URL 입력하여 미리보기 확인

## SEO 체크리스트

### 필수 항목
- [x] 메타 title, description 설정
- [x] Open Graph 태그 추가
- [x] Twitter Card 태그 추가
- [x] robots.txt 생성
- [x] sitemap.xml 생성
- [x] JSON-LD 구조화된 데이터
- [x] PWA manifest
- [x] Open Graph 이미지
- [ ] Google Search Console 등록
- [ ] 실제 도메인 설정

### 권장 항목
- [x] 의미있는 페이지 title
- [x] 키워드 최적화
- [x] 모바일 최적화 (PWA)
- [x] 페이지 로딩 속도 최적화
- [ ] 실제 스크린샷 추가 (manifest screenshots)
- [ ] 404 페이지 커스터마이징

## 모니터링

### Google Search Console
- 검색 성과 확인
- 크롤링 오류 확인
- 사이트맵 상태 확인

### Google Analytics (선택사항)
```typescript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

## 참고 자료
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
