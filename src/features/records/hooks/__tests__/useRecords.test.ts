import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "@/shared/lib/db";
import type { FoodRecord } from "@/features/records/types";

// DB 직접 테스트 (fake-indexeddb 사용)
// useLiveQuery는 React 렌더링 환경이 필요하므로 DB 레이어를 직접 테스트한다.

const makeRecord = (
  overrides: Partial<Omit<FoodRecord, "id">> = {}
): Omit<FoodRecord, "id"> => ({
  date: "2024-06-01",
  time: "12:00",
  restaurantName: "테스트 식당",
  location: {
    address: "서울시 강남구 테헤란로 1",
    latitude: 37.4979,
    longitude: 127.0276,
    placeName: "테스트 식당",
  },
  foodName: "테스트 음식",
  category: "한식",
  rating: 4,
  review: "맛있어요",
  price: 12000,
  createdAt: new Date("2024-06-01T12:00:00Z"),
  updatedAt: new Date("2024-06-01T12:00:00Z"),
  ...overrides,
});

describe("FoodLogDB - foodRecords CRUD", () => {
  beforeEach(async () => {
    await db.foodRecords.clear();
  });

  afterEach(async () => {
    await db.foodRecords.clear();
  });

  describe("add", () => {
    it("레코드를 추가하고 ID를 반환한다", async () => {
      const record = makeRecord();
      const id = await db.foodRecords.add(record as FoodRecord);
      expect(typeof id).toBe("number");
      expect(id).toBeGreaterThan(0);
    });

    it("추가된 레코드를 조회할 수 있다", async () => {
      const record = makeRecord({ restaurantName: "강남 맛집" });
      const id = await db.foodRecords.add(record as FoodRecord);
      const saved = await db.foodRecords.get(id);
      expect(saved?.restaurantName).toBe("강남 맛집");
    });

    it("여러 레코드를 순서대로 추가한다", async () => {
      await db.foodRecords.add(makeRecord({ foodName: "김치찌개" }) as FoodRecord);
      await db.foodRecords.add(makeRecord({ foodName: "된장찌개" }) as FoodRecord);
      await db.foodRecords.add(makeRecord({ foodName: "순두부찌개" }) as FoodRecord);

      const all = await db.foodRecords.toArray();
      expect(all).toHaveLength(3);
      expect(all.map((r) => r.foodName)).toContain("김치찌개");
    });
  });

  describe("get", () => {
    it("존재하지 않는 ID는 undefined를 반환한다", async () => {
      const result = await db.foodRecords.get(99999);
      expect(result).toBeUndefined();
    });

    it("유효한 ID로 레코드를 조회한다", async () => {
      const id = await db.foodRecords.add(makeRecord() as FoodRecord);
      const record = await db.foodRecords.get(id);
      expect(record?.id).toBe(id);
    });
  });

  describe("delete", () => {
    it("레코드를 삭제한다", async () => {
      const id = await db.foodRecords.add(makeRecord() as FoodRecord);
      await db.foodRecords.delete(id);
      const result = await db.foodRecords.get(id);
      expect(result).toBeUndefined();
    });

    it("삭제 후 나머지 레코드는 유지된다", async () => {
      const id1 = await db.foodRecords.add(
        makeRecord({ foodName: "음식1" }) as FoodRecord
      );
      const id2 = await db.foodRecords.add(
        makeRecord({ foodName: "음식2" }) as FoodRecord
      );

      await db.foodRecords.delete(id1);
      const all = await db.foodRecords.toArray();
      expect(all).toHaveLength(1);
      expect(all[0].id).toBe(id2);
    });
  });

  describe("update", () => {
    it("레코드를 업데이트한다", async () => {
      const id = await db.foodRecords.add(
        makeRecord({ rating: 3 }) as FoodRecord
      );
      await db.foodRecords.update(id, { rating: 5 });
      const updated = await db.foodRecords.get(id);
      expect(updated?.rating).toBe(5);
    });

    it("부분 업데이트가 다른 필드를 변경하지 않는다", async () => {
      const id = await db.foodRecords.add(
        makeRecord({ foodName: "원래 음식", rating: 3 }) as FoodRecord
      );
      await db.foodRecords.update(id, { rating: 5 });
      const updated = await db.foodRecords.get(id);
      expect(updated?.foodName).toBe("원래 음식");
      expect(updated?.rating).toBe(5);
    });
  });

  describe("query", () => {
    it("createdAt 내림차순으로 정렬한다", async () => {
      await db.foodRecords.add(
        makeRecord({
          foodName: "오래된 음식",
          createdAt: new Date("2024-01-01"),
        }) as FoodRecord
      );
      await db.foodRecords.add(
        makeRecord({
          foodName: "최신 음식",
          createdAt: new Date("2024-06-01"),
        }) as FoodRecord
      );

      const sorted = await db.foodRecords
        .orderBy("createdAt")
        .reverse()
        .toArray();
      expect(sorted[0].foodName).toBe("최신 음식");
      expect(sorted[1].foodName).toBe("오래된 음식");
    });

    it("별점으로 필터링한다", async () => {
      await db.foodRecords.add(makeRecord({ rating: 5 }) as FoodRecord);
      await db.foodRecords.add(makeRecord({ rating: 3 }) as FoodRecord);
      await db.foodRecords.add(makeRecord({ rating: 5 }) as FoodRecord);

      const highRated = await db.foodRecords
        .where("rating")
        .equals(5)
        .toArray();
      expect(highRated).toHaveLength(2);
    });

    it("가격 정보를 저장하고 조회한다", async () => {
      await db.foodRecords.add(makeRecord({ price: 15000 }) as FoodRecord);
      const all = await db.foodRecords.toArray();
      expect(all[0].price).toBe(15000);
    });
  });
});
