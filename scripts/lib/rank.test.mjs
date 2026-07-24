import { describe, expect, it } from "vitest";
import { scoreCandidates, selectTop } from "./rank.mjs";

describe("scoreCandidates", () => {
  it("normalizes scores against each source's own max, not a global max", () => {
    const result = scoreCandidates([
      { sourceKey: "hn:1", score: 50 },
      { sourceKey: "hn:2", score: 100 },
      { sourceKey: "gh:owner/repo", score: 3 },
    ]);
    expect(result.map((c) => c.normalizedScore)).toEqual([0.5, 1, 1]);
  });

  it("treats a missing score as zero without dividing by zero", () => {
    const result = scoreCandidates([{ sourceKey: "hn:1" }, { sourceKey: "hn:2" }]);
    expect(result.map((c) => c.normalizedScore)).toEqual([0, 0]);
  });
});

describe("selectTop", () => {
  it("returns the top N candidates sorted by normalized score descending", () => {
    const candidates = [
      { sourceKey: "hn:1", name: "low", score: 1 },
      { sourceKey: "hn:2", name: "high", score: 100 },
      { sourceKey: "hn:3", name: "mid", score: 50 },
    ];
    const result = selectTop(candidates, 2);
    expect(result.map((c) => c.name)).toEqual(["high", "mid"]);
  });

  it("gives a strong candidate from a small-scale source a fair shot against a large-scale source", () => {
    const candidates = [
      { sourceKey: "hn:1", name: "hn-best", score: 100 },
      { sourceKey: "hn:2", name: "hn-worst", score: 1 },
      { sourceKey: "gh:owner/repo", name: "gh-best", score: 3 },
    ];
    const result = selectTop(candidates, 2);
    expect(result.map((c) => c.name)).toEqual(["hn-best", "gh-best"]);
  });

  it("returns fewer than N when there aren't enough candidates", () => {
    expect(selectTop([{ sourceKey: "hn:1", name: "only", score: 5 }], 3)).toHaveLength(1);
  });
});
