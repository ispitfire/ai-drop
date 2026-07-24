const CATEGORY_KEYWORDS = {
  // NOTE: avoid short/generic substrings here — every GitHub candidate carries
  // the literal tag "artificial-intelligence" (it's the search topic), so a
  // bare "art" keyword false-matched almost everything into this category.
  Create: ["image", "video", "artwork", "illustration", "design", "music", "audio", "creative", "generation", "generate"],
  // "ide" was dropped: it's a substring of "provide", "decide", "video", "side",
  // "wide", etc. — far too common in ordinary description text. "editor" covers intent.
  Code: ["code", "coding", "editor", "cli", "compiler", "developer", "programming", "sdk"],
  Research: ["research", "benchmark", "evaluation", "eval", "paper", "dataset", "science"],
  Automate: ["agent", "automation", "automate", "workflow", "autonomous", "pipeline", "bot"],
  Work: ["productivity", "business", "saas", "backend", "database", "enterprise", "office", "team"],
};

const ACCENTS = ["coral", "lime", "purple", "blue"];

export function stripShowHnPrefix(title) {
  return title.replace(/^show\s*hn\s*:\s*/i, "").trim();
}

export function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function uniqueId(name, existingIds) {
  const base = slugify(name) || "tool";
  if (!existingIds.has(base)) return base;
  let n = 2;
  while (existingIds.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

export function categorize(candidate) {
  const haystack = `${candidate.name} ${candidate.description} ${(candidate.tags || []).join(" ")}`.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => haystack.includes(kw))) return category;
  }
  return "Create";
}

export function deriveIcon(name) {
  const words = name.trim().split(/[\s.\-_/]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  const word = words[0] || "??";
  return word.slice(0, 2).toUpperCase();
}

export function pickAccent(index) {
  return ACCENTS[index % ACCENTS.length];
}

export function normalizeCandidate(candidate, { existingIds, accentIndex }) {
  return {
    id: uniqueId(candidate.name, existingIds),
    name: candidate.name,
    description: candidate.description,
    category: categorize(candidate),
    tags: candidate.tags?.length ? candidate.tags.slice(0, 4) : ["new"],
    url: candidate.url,
    accent: pickAccent(accentIndex),
    icon: deriveIcon(candidate.name),
  };
}
