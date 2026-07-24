import { daysAgoDateString } from "../lib/dates.mjs";

const GH_SEARCH_URL = "https://api.github.com/search/repositories";

export async function fetchGithubTrendingCandidates({
  token = process.env.GITHUB_TOKEN,
  daysBack = 1,
  fetchImpl = fetch,
} = {}) {
  const q = `topic:artificial-intelligence created:>${daysAgoDateString(daysBack)}`;
  const params = new URLSearchParams({ q, sort: "stars", order: "desc", per_page: "20" });
  const headers = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetchImpl(`${GH_SEARCH_URL}?${params}`, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return (data.items || []).map((repo) => ({
    sourceKey: `gh:${repo.full_name}`,
    name: repo.name,
    description: repo.description || repo.full_name,
    url: repo.html_url,
    tags: (repo.topics || []).slice(0, 5),
    score: repo.stargazers_count ?? 0,
  }));
}
