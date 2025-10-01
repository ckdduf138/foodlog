# iPhone PWA Safe-Area 체크리스트

## ✅ 완료된 설정

### 1. Viewport 설정 (layout.tsx)
```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover' // ✅ Safe-area를 위한 필수 설정
};
```

### 2. Apple 메타 태그 (layout.tsx)
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="FoodLog" />
<link rel="apple-touch-icon" href="/icon.svg" />
```

### 3. CSS Safe-Area 변수 (globals.css)
```css
:root {
  --safe-area-inset-top: env(safe-area-inset-top, 0px);
  --safe-area-inset-right: env(safe-area-inset-right, 0px);
  --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-inset-left: env(safe-area-inset-left, 0px);
}

/* iOS PWA full screen support */
@supports (padding: max(0px)) {
  body {
    padding-top: max(0px, env(safe-area-inset-top));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-left: max(0px, env(safe-area-inset-left));
  }
}
```

### 4. Bottom Navigation Safe-Area
```css
.bottom-nav {
  height: calc(var(--bottom-nav-height) + var(--safe-area-inset-bottom));
  padding-bottom: var(--safe-area-inset-bottom);
}
```

### 5. Content Padding
```css
.content-with-bottom-nav {
  padding-bottom: calc(var(--bottom-nav-height) + var(--safe-area-inset-bottom));
}
```

### 6. FAB (Floating Action Button)
```css
.fab--above-bottom-nav {
  bottom: calc(var(--bottom-nav-height) + var(--safe-area-inset-bottom) + var(--bottom-nav-gap));
}
```

## 🔍 테스트 방법

### iPhone에서 PWA 테스트하기

1. **Safari에서 웹사이트 열기**
   - 개발 서버 또는 배포된 사이트 접속

2. **홈 화면에 추가**
   - Safari 하단의 공유 버튼 탭
   - "홈 화면에 추가" 선택
   - 추가 확인

3. **PWA 앱 실행**
   - 홈 화면의 FoodLog 아이콘 탭
   - 전체 화면 모드로 실행되는지 확인

4. **Safe-Area 확인 사항**
   - ✅ 상단 노치 영역이 가려지지 않는지
   - ✅ 하단 네비게이션이 홈 인디케이터 위에 있는지
   - ✅ FAB 버튼이 하단 네비게이션 위에 제대로 위치하는지
   - ✅ 컨텐츠가 잘리지 않는지
   - ✅ 좌우 여백이 노치에 가려지지 않는지

### 테스트할 iPhone 모델
- iPhone X 이상 (노치 있는 모델)
- iPhone 14 Pro 이상 (Dynamic Island 모델)

## 🐛 문제 발생 시 확인사항

### 1. Safe-Area가 적용되지 않는 경우
```css
/* 브라우저 개발자 도구에서 확인 */
getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')
```

### 2. Viewport가 제대로 설정되지 않은 경우
- `viewport-fit=cover`가 제대로 설정되었는지 확인
- 메타 태그가 중복되지 않았는지 확인

### 3. 다크모드 대응 확인
- body에 `dark:bg-gray-900` 클래스 추가됨
- 모든 컴포넌트에 다크모드 색상 적용

## 📱 추가 개선사항

### 필요한 아이콘 생성
iPhone은 SVG 아이콘을 지원하지 않을 수 있으므로 PNG 아이콘 생성 필요:
- 180x180 (apple-touch-icon)
- 512x512 (manifest icon)
- 192x192 (manifest icon)

### 스플래시 스크린
iOS PWA 스플래시 스크린을 위한 이미지 추가:
```html
<link rel="apple-touch-startup-image" href="/splash.png" />
```

## ✅ 현재 상태
- viewport-fit: cover ✅
- Safe-area CSS 변수 ✅
- Bottom Navigation 적용 ✅
- Content Padding 적용 ✅
- FAB 위치 조정 ✅
- Apple 메타 태그 ✅
- Body safe-area padding ✅
- 다크모드 대응 ✅

## 🎯 다음 단계
1. 실제 iPhone에서 테스트
2. Safe-area 값이 제대로 인식되는지 확인
3. 필요시 PNG 아이콘 생성 및 추가
4. 스플래시 스크린 추가 (선택사항)
