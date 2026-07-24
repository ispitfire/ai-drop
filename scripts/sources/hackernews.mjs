import { hoursAgoUnix } from "../lib/dates.mjs";
import { stripShowHnPrefix } from "../lib/normalize.mjs";

const HN_SEARCH_URL = "https://hn.algolia.com/api/v1/search_by_date";

export async function fetchHackerNewsCandidates({ hoursBack = 24, fetchImpl = fetch } = {}) {
  const params = new URLSearchParams({
    tags: "show_hn",
    query: "AI",
    numericFilters: `created_at_i>${hoursAgoUnix(hoursBack)}`,
  });
  const res = await fetchImpl(`${HN_SEARCH_URL}?${params}`);
  if (!res.ok) throw new Error(`HN API error: ${res.status}`);
  const data = await res.json();
  return (data.hits || [])
    .filter((hit) => hit.url && hit.title)
    .map((hit) => {
      const name = stripShowHnPrefix(hit.title);
      return {
        sourceKey: `hn:${hit.objectID}`,
        name,
        description: name,
        url: hit.url,
        tags: ["hacker-news"],
        score: hit.points ?? 0,
      };
    });
}
