import { describe, expect, it } from "vitest";
import { categorize, deriveIcon, normalizeCandidate, pickAccent, slugify, uniqueId } from "./normalize.mjs";

describe("slugify", () => {
  it("lowercases and dashes non-alphanumeric characters", () => {
    expect(slugify("Claude Code")).toBe("claude-code");
    expect(slugify("llama.cpp")).toBe("llama-cpp");
  });

  it("strips diacritics", () => {
    expect(slugify("Café AI")).toBe("cafe-ai");
  });

  it("trims leading/trailing dashes", () => {
    expect(slugify("--Weird!! Name--")).toBe("weird-name");
  });
});

describe("uniqueId", () => {
  it("returns the base slug when unused", () => {
    expect(uniqueId("New Tool", new Set(["other"]))).toBe("new-tool");
  });

  it("appends a numeric suffix on collision", () => {
    expect(uniqueId("New Tool", new Set(["new-tool"]))).toBe("new-tool-2");
    expect(uniqueId("New Tool", new Set(["new-tool", "new-tool-2"]))).toBe("new-tool-3");
  });
});

describe("categorize", () => {
  it("matches keywords in name/description/tags", () => {
    expect(categorize({ name: "CodeGen", description: "an AI coding assistant", tags: [] })).toBe("Code");
    expect(categorize({ name: "ArtBot", description: "generate stunning images", tags: [] })).toBe("Create");
    expect(categorize({ name: "EvalHarness", description: "LLM benchmark suite", tags: [] })).toBe("Research");
    expect(categorize({ name: "AutoAgent", description: "an autonomous automation agent", tags: [] })).toBe(
      "Automate"
    );
    expect(categorize({ name: "BizSuite", description: "productivity for business teams", tags: [] })).toBe("Work");
  });

  it("falls back to Create when nothing matches", () => {
    expect(categorize({ name: "Mystery", description: "does something", tags: [] })).toBe("Create");
  });
});

describe("deriveIcon", () => {
  it("uses first letters of the first two words", () => {
    expect(deriveIcon("Claude Code")).toBe("CC");
  });

  it("uses first two letters of a single word", () => {
    expect(deriveIcon("ComfyUI")).toBe("CO");
  });
});

describe("pickAccent", () => {
  it("cycles through the four known accent tokens", () => {
    expect(pickAccent(0)).toBe("coral");
    expect(pickAccent(1)).toBe("lime");
    expect(pickAccent(2)).toBe("purple");
    expect(pickAccent(3)).toBe("blue");
    expect(pickAccent(4)).toBe("coral");
  });
});

describe("normalizeCandidate", () => {
  it("builds a Tool-shaped object from a raw candidate", () => {
    const candidate = {
      name: "Cool Agent",
      description: "an autonomous agent for automation",
      url: "https://example.com/cool-agent",
      tags: ["agent", "automation"],
      score: 42,
    };
    const entry = normalizeCandidate(candidate, { existingIds: new Set(), accentIndex: 0 });
    expect(entry).toMatchObject({
      id: "cool-agent",
      name: "Cool Agent",
      category: "Automate",
      url: "https://example.com/cool-agent",
      accent: "coral",
      icon: "CA",
    });
    expect(entry.tags).toEqual(["agent", "automation"]);
  });
});
