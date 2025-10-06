import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack 설정 (최신 Next.js 15 방식)
  turbopack: {},
};

// 개발 환경에서는 PWA 비활성화, 프로덕션에서만 활성화
let config = nextConfig;

if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: false,
    buildExcludes: [/middleware-manifest\.json$/],
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  });

  config = withPWA(nextConfig);
}

export default config;
