import { describe, expect, it } from "vitest";
import { filterCandidates, isDuplicateUrl, normalizeUrl } from "./dedupe.mjs";

describe("normalizeUrl", () => {
  it("strips protocol and trailing slash for comparison", () => {
    expect(normalizeUrl("https://example.com/tool/")).toBe(normalizeUrl("http://example.com/tool"));
  });
});

describe("isDuplicateUrl", () => {
  const existingTools = [{ id: "a", url: "https://example.com/a" }];

  it("detects an existing url regardless of protocol/trailing slash", () => {
    expect(isDuplicateUrl(existingTools, "https://example.com/a/")).toBe(true);
  });

  it("returns false for a new url", () => {
    expect(isDuplicateUrl(existingTools, "https://example.com/b")).toBe(false);
  });
});

describe("filterCandidates", () => {
  const existingTools = [{ id: "a", url: "https://example.com/a" }];

  it("drops candidates already seen by source key", () => {
    const candidates = [{ sourceKey: "hn:1", url: "https://example.com/new" }];
    const result = filterCandidates(candidates, { existingTools, seenSources: ["hn:1"] });
    expect(result).toEqual([]);
  });

  it("drops candidates whose url already exists in tools.json", () => {
    const candidates = [{ sourceKey: "hn:2", url: "https://example.com/a" }];
    const result = filterCandidates(candidates, { existingTools, seenSources: [] });
    expect(result).toEqual([]);
  });

  it("drops duplicate urls within the same batch", () => {
    const candidates = [
      { sourceKey: "hn:3", url: "https://example.com/new" },
      { sourceKey: "gh:owner/new", url: "https://example.com/new/" },
    ];
    const result = filterCandidates(candidates, { existingTools, seenSources: [] });
    expect(result).toHaveLength(1);
  });

  it("keeps genuinely new candidates", () => {
    const candidates = [{ sourceKey: "hn:4", url: "https://example.com/fresh" }];
    const result = filterCandidates(candidates, { existingTools, seenSources: [] });
    expect(result).toEqual(candidates);
  });
});
