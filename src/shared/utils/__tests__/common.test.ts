import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  cn,
  formatDate,
  getRelativeTime,
  truncate,
} from "@/shared/utils/common";

describe("cn", () => {
  it("단일 클래스를 반환한다", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("여러 클래스를 병합한다", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("falsy 값을 무시한다", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });

  it("Tailwind 충돌 클래스를 올바르게 병합한다", () => {
    // twMerge: 나중 클래스가 앞 클래스를 덮어씀
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("조건부 클래스를 처리한다", () => {
    const isActive = true;
    expect(cn("base", isActive && "active")).toBe("base active");
    expect(cn("base", !isActive && "inactive")).toBe("base");
  });
});

describe("formatDate", () => {
  it("Date 객체를 한국어 형식으로 포맷한다", () => {
    const date = new Date(2024, 0, 15); // 2024-01-15
    const result = formatDate(date);
    expect(result).toContain("2024");
    expect(result).toContain("1");
    expect(result).toContain("15");
  });

  it("ISO 문자열을 한국어 형식으로 포맷한다", () => {
    const result = formatDate("2024-06-01");
    expect(result).toContain("2024");
    expect(result).toContain("6");
    expect(result).toContain("1");
  });

  it("연, 월, 일을 포함한다", () => {
    const result = formatDate(new Date(2025, 11, 25));
    expect(result).toMatch(/2025/);
    expect(result).toMatch(/12/);
    expect(result).toMatch(/25/);
  });
});

describe("getRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("1분 이내는 '방금 전'을 반환한다", () => {
    const now = new Date("2024-06-01T12:00:00Z");
    expect(getRelativeTime(now)).toBe("방금 전");
  });

  it("30분 전은 '30분 전'을 반환한다", () => {
    const thirtyMinutesAgo = new Date("2024-06-01T11:30:00Z");
    expect(getRelativeTime(thirtyMinutesAgo)).toBe("30분 전");
  });

  it("3시간 전은 '3시간 전'을 반환한다", () => {
    const threeHoursAgo = new Date("2024-06-01T09:00:00Z");
    expect(getRelativeTime(threeHoursAgo)).toBe("3시간 전");
  });

  it("3일 전은 '3일 전'을 반환한다", () => {
    const threeDaysAgo = new Date("2024-05-29T12:00:00Z");
    expect(getRelativeTime(threeDaysAgo)).toBe("3일 전");
  });

  it("2주 전은 '2주 전'을 반환한다", () => {
    const twoWeeksAgo = new Date("2024-05-18T12:00:00Z");
    expect(getRelativeTime(twoWeeksAgo)).toBe("2주 전");
  });

  it("2개월 전은 '2개월 전'을 반환한다", () => {
    const twoMonthsAgo = new Date("2024-04-01T12:00:00Z");
    expect(getRelativeTime(twoMonthsAgo)).toBe("2개월 전");
  });

  it("문자열 날짜도 처리한다", () => {
    const result = getRelativeTime("2024-06-01T11:55:00Z");
    expect(result).toBe("5분 전");
  });
});

describe("truncate", () => {
  it("길이 내의 문자열은 그대로 반환한다", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("길이를 초과하면 말줄임표를 추가한다", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
  });

  it("정확히 길이와 같으면 그대로 반환한다", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("빈 문자열을 처리한다", () => {
    expect(truncate("", 10)).toBe("");
  });

  it("한국어 문자열을 처리한다", () => {
    expect(truncate("강남역 맛집 추천", 6)).toBe("강남역 맛집...");
  });
});
