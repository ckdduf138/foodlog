import "@testing-library/jest-dom";
import { vi } from "vitest";

// IndexedDB mock (fake-indexeddb)
import "fake-indexeddb/auto";

// Next.js router mock
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// navigator.vibrate mock
Object.defineProperty(navigator, "vibrate", {
  value: vi.fn(),
  writable: true,
});

// navigator.share mock
Object.defineProperty(navigator, "share", {
  value: vi.fn().mockResolvedValue(undefined),
  writable: true,
});

// navigator.clipboard mock
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
  writable: true,
});
