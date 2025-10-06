import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "FoodLog - 나만의 음식 기록 다이어리",
    template: "%s | FoodLog",
  },
  description:
    "맛집을 기록하고 추억하세요. 위치, 사진, 별점, 가격, 메모까지 한 곳에서 관리하는 개인 음식 기록 앱. 오프라인에서도 사용 가능한 PWA 앱입니다.",
  keywords: [
    "음식 기록",
    "맛집 기록",
    "푸드 다이어리",
    "음식 일기",
    "맛집 다이어리",
    "음식 메모",
    "레스토랑 기록",
    "음식 사진",
    "별점 기록",
    "PWA",
    "오프라인 앱",
    "음식 앱",
  ],
  authors: [{ name: "FoodLog Team" }],
  creator: "FoodLog Team",
  publisher: "FoodLog Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FoodLog",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://foodlog.vercel.app",
    title: "FoodLog - 나만의 음식 기록 다이어리",
    description:
      "맛집을 기록하고 추억하세요. 위치, 사진, 별점, 가격, 메모까지 한 곳에서 관리하는 개인 음식 기록 앱.",
    siteName: "FoodLog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FoodLog - 음식 기록 앱",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodLog - 나만의 음식 기록 다이어리",
    description:
      "맛집을 기록하고 추억하세요. 위치, 사진, 별점, 가격, 메모까지 한 곳에서 관리하는 개인 음식 기록 앱.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console 등록 시 추가
    // google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // JSON-LD 구조화된 데이터
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FoodLog',
    alternateName: '푸드로그',
    description:
      '맛집을 기록하고 추억하세요. 위치, 사진, 별점, 가격, 메모까지 한 곳에서 관리하는 개인 음식 기록 앱.',
    url: 'https://foodlog.vercel.app',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    author: {
      '@type': 'Organization',
      name: 'FoodLog Team',
    },
    inLanguage: 'ko-KR',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0.0',
    featureList: [
      '음식 기록 작성',
      '위치 검색',
      '사진 업로드',
      '별점 평가',
      '가격 기록',
      '통계 확인',
      '오프라인 사용',
      'PWA 지원',
    ],
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* iOS PWA 메타 태그 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FoodLog" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        
        {/* JSON-LD 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen w-full overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
