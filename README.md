# 🍽️ FoodLog - 푸드로그

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-brightgreen.svg)

**나만의 음식 기록 다이어리** - 맛집을 기록하고 추억하세요

## 📋 프로젝트 개요

FoodLog는 개인의 음식 경험을 체계적으로 기록하고 관리할 수 있는 Progressive Web App입니다. 위치, 사진, 별점, 가격, 메모까지 한 곳에서 관리하며, 오프라인에서도 완벽하게 동작합니다.

### 🎯 주요 기능

- ✅ **음식 기록 CRUD** - 날짜, 위치, 음식명, 사진, 별점, 가격, 한줄평
- ✅ **기록 목록/검색/필터** - 다양한 조건으로 기록 조회
- ✅ **현재 위치 기반 음식점 검색** - 카카오 지도 API 연동
- ✅ **통계 대시보드** - 전체 기록 수, 평균 별점, 총 지출 금액, 연속 기록 일수
- ✅ **사진 촬영/갤러리** - 음식 사진 저장 및 관리
- ✅ **피드백 시스템** - Discord Webhook 기반 피드백 전송
- ✅ **다크 모드** - 라이트/다크/시스템 테마 지원
- ✅ **PWA 기능** - 앱처럼 설치 및 오프라인 지원
- ✅ **SEO 최적화** - Open Graph, Twitter Card, JSON-LD 구조화된 데이터
- ✅ **로컬 DB** - IndexedDB 기반 데이터 저장 (Dexie.js)
- 🔄 **클라우드 백업/동기화** - 유료 기능 (추후 개발)

## 🛠️ 기술 스택

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Database**: IndexedDB (Dexie.js)
- **PWA**: next-pwa
- **Maps**: Kakao Map API
- **Feedback**: Discord Webhook
- **Theme**: next-themes
- **Analytics**: Vercel Analytics + Speed Insights
- **Deployment**: Vercel

## 🚀 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone [repository-url]
cd foodlog
yarn install
```

### 2. 환경 변수 설정

`.env.local` 파일 생성:

```bash
cp .env.local.example .env.local
```

필수 환경 변수 설정:

```bash
# Kakao Map API
NEXT_PUBLIC_KAKAO_REST_API_KEY=your_kakao_rest_api_key_here

# Discord Webhook for Feedback (선택사항)
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here

# App Configuration
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 개발 서버 실행

```bash
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 빌드 및 배포

```bash
yarn build
yarn start
```

## 📱 PWA 기능

- **오프라인 지원**: 네트워크 연결 없이도 기본 기능 사용 가능
- **앱 설치**: 홈 화면에 앱처럼 설치 가능
- **빠른 실행**: 바로가기로 새 기록 추가, 기록 보기, 통계 확인
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 최적화

## 🔍 SEO 최적화

FoodLog는 검색 엔진 최적화를 위해 다음 기능을 구현했습니다:

- ✅ **메타데이터**: Title, Description, Keywords
- ✅ **Open Graph**: 소셜 미디어 공유 최적화
- ✅ **Twitter Card**: 트위터 공유 최적화
- ✅ **JSON-LD**: Schema.org WebApplication 구조화된 데이터
- ✅ **Sitemap**: 동적 sitemap.xml 생성
- ✅ **Robots.txt**: 크롤러 설정
- ✅ **OG Image**: 자동 생성되는 Open Graph 이미지

자세한 내용은 [SEO_OPTIMIZATION.md](./SEO_OPTIMIZATION.md)를 참고하세요.

## 💾 데이터 구조

### FoodRecord

```typescript
interface FoodRecord {
  id?: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  restaurantName: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  foodName: string;
  rating: number; // 1-5 별점
  price?: number; // 가격 (선택)
  review: string; // 한줄평
  photo?: string; // base64 이미지
  createdAt: Date;
  updatedAt: Date;
}
```

## 🗂️ 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # 공통 레이아웃
│   ├── page.tsx        # 홈 페이지
│   └── globals.css     # 글로벌 스타일
├── lib/
│   └── db.ts          # IndexedDB 설정
├── components/         # 재사용 컴포넌트 (추후 추가)
└── types/             # TypeScript 타입 정의 (추후 추가)
```

## 🔮 로드맵

### Phase 1 (현재)

- [x] 기본 프로젝트 설정
- [x] PWA 설정
- [x] IndexedDB 모델링
- [x] 홈 화면 UI

### Phase 2 (개발 예정)

- [ ] 음식 기록 CRUD 기능
- [ ] 카카오 지도 API 연동
- [ ] 위치 기반 음식점 검색
- [ ] 사진 업로드/저장

### Phase 3 (확장 기능)

- [ ] 통계 대시보드
- [ ] 검색/필터 고도화
- [ ] 클라우드 백업/동기화
- [ ] 다중 기기 지원

## 🌐 도메인 연동

추후 `foodlog.co.kr` 도메인 연동 예정

## 💰 비즈니스 모델

- **무료**: 로컬 DB 기반 모든 핵심 기능
- **유료**: 클라우드 백업/복원, 멀티 디바이스 동기화, 고급 통계

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

프로젝트 관련 문의: [이메일 주소]

---

**FoodLog** - 맛있는 순간을 기록하고 공유하세요! 🍽️✨
