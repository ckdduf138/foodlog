import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  calculateAverage,
  calculatePercentage,
  calculateStreakDays,
} from "@/features/home/utils/statsHelpers";

describe("calculateAverage", () => {
  it("빈 배열은 0을 반환한다", () => {
    expect(calculateAverage([])).toBe(0);
  });

  it("단일 값의 평균은 그 값이다", () => {
    expect(calculateAverage([5])).toBe(5);
  });

  it("여러 값의 평균을 올바르게 계산한다", () => {
    expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
  });

  it("소수점 평균을 계산한다", () => {
    expect(calculateAverage([1, 2])).toBeCloseTo(1.5);
  });

  it("별점 범위(1-5)에서 올바르게 동작한다", () => {
    expect(calculateAverage([3, 4, 5, 4, 3])).toBeCloseTo(3.8);
  });
});

describe("calculatePercentage", () => {
  it("0 / 0 = 0을 반환한다", () => {
    expect(calculatePercentage(0, 0)).toBe(0);
  });

  it("total이 0이면 0을 반환한다", () => {
    expect(calculatePercentage(5, 0)).toBe(0);
  });

  it("반을 차지하면 50%를 반환한다", () => {
    expect(calculatePercentage(5, 10)).toBe(50);
  });

  it("전체를 차지하면 100%를 반환한다", () => {
    expect(calculatePercentage(10, 10)).toBe(100);
  });

  it("소수점을 반올림한다", () => {
    expect(calculatePercentage(1, 3)).toBe(33); // 33.33... → 33
  });
});

describe("calculateStreakDays", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-05"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("빈 배열은 0을 반환한다", () => {
    expect(calculateStreakDays([])).toBe(0);
  });

  it("오늘 하나의 기록이면 1을 반환한다", () => {
    expect(calculateStreakDays(["2024-06-05"])).toBe(1);
  });

  it("연속된 3일 기록은 3을 반환한다", () => {
    expect(
      calculateStreakDays(["2024-06-03", "2024-06-04", "2024-06-05"])
    ).toBe(3);
  });

  it("연속이 끊긴 경우 0을 반환한다 (2일 이상 공백)", () => {
    expect(calculateStreakDays(["2024-06-01", "2024-06-02"])).toBe(0);
  });

  it("어제까지 연속 기록도 스트릭에 포함된다", () => {
    expect(
      calculateStreakDays(["2024-06-03", "2024-06-04"])
    ).toBe(2);
  });

  it("같은 날 중복 기록은 하루로 계산한다", () => {
    expect(
      calculateStreakDays(["2024-06-05", "2024-06-05", "2024-06-04"])
    ).toBe(2);
  });

  it("Date 객체도 처리한다", () => {
    expect(
      calculateStreakDays([new Date("2024-06-04"), new Date("2024-06-05")])
    ).toBe(2);
  });
});
