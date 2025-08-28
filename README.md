# 🍽️ FoodLog - 푸드로그

개인 음식 기록 PWA 앱 - 날짜, 위치, 음식, 사진, 별점, 한줄평을 기록하세요

## 📋 프로젝트 개요

FoodLog는 개인의 음식 경험을 체계적으로 기록하고 관리할 수 있는 Progressive Web App입니다.

### 🎯 주요 기능

- ✅ **음식 기록 추가** - 날짜, 위치, 음식명, 사진, 별점, 한줄평
- ✅ **기록 목록/검색/필터** - 다양한 조건으로 기록 조회
- 🔄 **현재 위치 기반 음식점 검색** - 카카오 지도 API 연동
- ✅ **PWA 기능** - 앱처럼 설치 및 오프라인 지원
- ✅ **로컬 DB** - IndexedDB 기반 데이터 저장
- 🔄 **클라우드 백업/동기화** - 유료 기능 (추후 개발)

## 🛠️ 기술 스택

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Database**: IndexedDB (Dexie.js)
- **PWA**: next-pwa
- **Maps**: Kakao Map API (추후 연동)
- **Deployment**: Vercel

## 🚀 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone [repository-url]
cd foodlog
yarn install
```

### 2. 개발 서버 실행

```bash
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드

```bash
yarn build
yarn start
```

## 📱 PWA 기능

- **오프라인 지원**: 네트워크 연결 없이도 기본 기능 사용 가능
- **앱 설치**: 홈 화면에 앱처럼 설치 가능
- **푸시 알림**: 식사 시간 알림 (추후 개발)

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
