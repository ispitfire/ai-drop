import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fetchHackerNewsCandidates } from "./sources/hackernews.mjs";
import { fetchProductHuntCandidates } from "./sources/producthunt.mjs";
import { fetchGithubTrendingCandidates } from "./sources/github.mjs";
import { normalizeCandidate } from "./lib/normalize.mjs";
import { filterCandidates } from "./lib/dedupe.mjs";
import { filterByMinScore, selectTop } from "./lib/rank.mjs";
import { recomputeFreshness, setFeatured } from "./lib/freshness.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TOOLS_JSON_PATH = path.join(ROOT, "src/data/tools.json");
const SEEN_SOURCES_PATH = path.join(ROOT, "data/seen-sources.json");

const MAX_NEW_PER_DAY = 3;
const FRESH_WINDOW_DAYS = 7;

// Quality floor: a candidate must clear its source's bar on its own merits,
// not just be the "best of a weak batch" — an empty day is better than a filler entry.
const MIN_SCORE_BY_SOURCE = { hn: 20, gh: 50, ph: 20 };

const isDryRun = process.argv.includes("--dry-run");

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return fallback;
    throw err;
  }
}

async function main() {
  const toolsData = await readJson(TOOLS_JSON_PATH, { categories: [], tools: [] });
  const seenSources = await readJson(SEEN_SOURCES_PATH, []);

  const [hn, ph, gh] = await Promise.all([
    fetchHackerNewsCandidates().catch((err) => {
      console.warn("HN fetch failed:", err.message);
      return [];
    }),
    fetchProductHuntCandidates().catch((err) => {
      console.warn("Product Hunt fetch failed:", err.message);
      return [];
    }),
    fetchGithubTrendingCandidates().catch((err) => {
      console.warn("GitHub fetch failed:", err.message);
      return [];
    }),
  ]);

  const allCandidates = [...hn, ...ph, ...gh];
  const deduped = filterCandidates(allCandidates, { existingTools: toolsData.tools, seenSources });
  const qualified = filterByMinScore(deduped, MIN_SCORE_BY_SOURCE);
  const chosen = selectTop(qualified, MAX_NEW_PER_DAY);

  const today = new Date().toISOString().slice(0, 10);
  const existingIds = new Set(toolsData.tools.map((t) => t.id));

  const newEntries = chosen.map((candidate, i) => {
    const entry = normalizeCandidate(candidate, { existingIds, accentIndex: toolsData.tools.length + i });
    existingIds.add(entry.id);
    return { ...entry, isNew: true, addedAt: today };
  });

  let updatedTools = recomputeFreshness(toolsData.tools, today, FRESH_WINDOW_DAYS);
  updatedTools = [...updatedTools, ...newEntries];

  if (newEntries.length > 0) {
    updatedTools = setFeatured(updatedTools, newEntries[0].id);
  }

  const updatedSeenSources = [...seenSources, ...chosen.map((c) => c.sourceKey)];

  if (isDryRun) {
    console.log(`Candidates found: HN=${hn.length} PH=${ph.length} GH=${gh.length}`);
    console.log(`After dedupe: ${deduped.length}; after quality floor: ${qualified.length}`);
    console.log(`Dry run: would add ${newEntries.length} new tool(s):`);
    for (const entry of newEntries) {
      console.log(`  - ${entry.name} (${entry.category}) ${entry.url}${entry.featured ? " [featured]" : ""}`);
    }
    const freshCount = updatedTools.filter((t) => t.isNew).length;
    console.log(`Fresh-drop count after refresh: ${freshCount}`);
    return;
  }

  await writeFile(
    TOOLS_JSON_PATH,
    JSON.stringify({ categories: toolsData.categories, tools: updatedTools }, null, 2) + "\n"
  );
  await mkdir(path.dirname(SEEN_SOURCES_PATH), { recursive: true });
  await writeFile(SEEN_SOURCES_PATH, JSON.stringify(updatedSeenSources, null, 2) + "\n");

  if (newEntries.length === 0) {
    console.log("No candidates cleared today's quality bar; freshness refreshed, no new tools added.");
  } else {
    console.log(`Added ${newEntries.length} new tool(s); wrote ${TOOLS_JSON_PATH} and ${SEEN_SOURCES_PATH}.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
