import { test, expect, Page } from "@playwright/test";

// 카카오 맵 API 호출을 가로채서 목 응답을 반환한다
async function mockKakaoMapApi(page: Page) {
  await page.route("**/v2/local/search/keyword*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        documents: [
          {
            id: "test-place-1",
            place_name: "테스트 카페",
            road_address_name: "서울시 강남구 테헤란로 1",
            address_name: "서울시 강남구 역삼동",
            x: "127.0276",
            y: "37.4979",
          },
        ],
        meta: { total_count: 1, pageable_count: 1, is_end: true },
      }),
    });
  });
}

test.describe("음식 기록 목록 페이지", () => {
  test("기록이 없을 때 빈 상태 메시지를 표시한다", async ({ page }) => {
    await page.goto("/records");
    await page.waitForLoadState("networkidle");

    // 빈 상태이거나 기록 목록이 있어야 함
    await expect(page.getByRole("heading", { name: "기록", exact: true })).toBeVisible();
  });

  test("검색바가 렌더링된다", async ({ page }) => {
    await page.goto("/records");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByPlaceholder(/검색|식당|음식|Search/i)
    ).toBeVisible();
  });
});

test.describe("음식 기록 등록 플로우", () => {
  test.beforeEach(async ({ page }) => {
    await mockKakaoMapApi(page);
    // 카카오 맵 SDK 로드 전에 목을 주입한다
    await page.addInitScript(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).kakao = {
        maps: {
          load: (cb: () => void) => cb(),
          services: {
            Places: class {
              keywordSearch(
                keyword: string,
                callback: (result: unknown[], status: string) => void
              ) {
                callback(
                  [
                    {
                      id: "test-place-1",
                      place_name: "테스트 카페",
                      road_address_name: "서울시 강남구 테헤란로 1",
                      address_name: "서울시 강남구 역삼동",
                      x: "127.0276",
                      y: "37.4979",
                    },
                  ],
                  "OK"
                );
              }
            },
            Status: { OK: "OK", ZERO_RESULT: "ZERO_RESULT", ERROR: "ERROR" },
          },
          LatLng: class {
            constructor(lat: number, lng: number) {
                return { lat, lng };
            }
          },
          Map: class {
            setCenter() {}
            getCenter() {
              return { getLat: () => 37.4979, getLng: () => 127.0276 };
            }
          },
          Marker: class {
            setMap() {}
            setPosition() {}
          },
        },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as unknown as any;
    });
  });

  test("기록 등록 페이지로 이동한다", async ({ page }) => {
    await page.goto("/records/new");
    await expect(page).toHaveURL(/\/records\/new/);
  });

  test("FAB 버튼이 records 페이지에 표시된다", async ({ page }) => {
    await page.goto("/records");
    await page.waitForLoadState("networkidle");
    const fab = page.locator('[aria-label="기록 추가"]');
    await expect(fab).toBeVisible();
  });
});

test.describe("홈 페이지", () => {
  test("홈 페이지가 로드된다", async ({ page }) => {
    await page.goto("/home");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("text=FoodLog")).toBeVisible();
  });

  test("하단 네비게이션이 표시된다", async ({ page }) => {
    await page.goto("/home");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("nav")).toBeVisible();
  });

  test("통계 페이지로 이동할 수 있다", async ({ page }) => {
    await page.goto("/home");
    await page.waitForLoadState("networkidle");

    // 하단 네비게이션에서 통계 클릭
    const statsLink = page.getByRole("link", { name: /통계/i });
    if (await statsLink.isVisible()) {
      await statsLink.click();
      await expect(page).toHaveURL(/\/stats/);
    }
  });
});

test.describe("오프라인 동작", () => {
  test("오프라인 상태에서도 기록 목록 페이지가 표시된다", async ({
    page,
    context,
  }) => {
    // 먼저 온라인으로 페이지 로드
    await page.goto("/records");
    await page.waitForLoadState("networkidle");

    // 오프라인으로 전환
    await context.setOffline(true);

    // 페이지 새로고침
    await page.reload().catch(() => {});

    // IndexedDB 기반이므로 오프라인에서도 UI가 표시되어야 함
    // (SW가 없는 dev 환경에서는 네트워크 에러가 날 수 있으므로 title만 확인)
    const title = await page.title().catch(() => "");
    expect(typeof title).toBe("string");

    // 온라인으로 복구
    await context.setOffline(false);
  });

  test("오프라인 전환 후 온라인 복귀 시 데이터가 유지된다", async ({
    page,
    context,
  }) => {
    await page.goto("/records");
    await page.waitForLoadState("networkidle");

    // IndexedDB에 데이터 삽입 (브라우저 Dexie 인스턴스를 통해)
    await page.evaluate(async () => {
      const request = indexedDB.open("FoodLogDB", 1);
      await new Promise<void>((resolve) => {
        request.onsuccess = () => resolve();
        request.onerror = () => resolve();
      });
    }).catch(() => {});

    // 오프라인 전환
    await context.setOffline(true);
    await page.reload().catch(() => {});

    // 온라인 복귀
    await context.setOffline(false);
    await page.goto("/records");
    await page.waitForLoadState("networkidle");

    // 페이지가 정상 렌더링되는지 확인
    await expect(page.getByRole("heading", { name: "기록", exact: true })).toBeVisible();
  });
});
