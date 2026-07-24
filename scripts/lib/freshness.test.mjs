import { describe, expect, it } from "vitest";
import { daysSince, recomputeFreshness, setFeatured } from "./freshness.mjs";

describe("daysSince", () => {
  it("computes whole-day differences", () => {
    expect(daysSince("2026-07-17", "2026-07-24")).toBe(7);
    expect(daysSince("2026-07-24", "2026-07-24")).toBe(0);
  });
});

describe("recomputeFreshness", () => {
  it("marks addedAt entries stale once past the window", () => {
    const tools = [
      { id: "old", addedAt: "2026-07-01", isNew: true },
      { id: "recent", addedAt: "2026-07-20", isNew: true },
    ];
    const result = recomputeFreshness(tools, "2026-07-24", 7);
    expect(result.find((t) => t.id === "old").isNew).toBe(false);
    expect(result.find((t) => t.id === "recent").isNew).toBe(true);
  });

  it("leaves curated entries without addedAt untouched", () => {
    const tools = [{ id: "curated", isNew: true }];
    const result = recomputeFreshness(tools, "2026-07-24", 7);
    expect(result).toEqual(tools);
  });
});

describe("setFeatured", () => {
  it("marks exactly the given id as featured and unsets all others", () => {
    const tools = [
      { id: "a", featured: true },
      { id: "b" },
      { id: "c" },
    ];
    const result = setFeatured(tools, "b");
    expect(result.map((t) => [t.id, t.featured])).toEqual([
      ["a", false],
      ["b", true],
      ["c", false],
    ]);
  });
});
