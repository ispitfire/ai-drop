import { hoursAgoISO } from "../lib/dates.mjs";

const PH_API_URL = "https://api.producthunt.com/v2/api/graphql";

const QUERY = `
  query TrendingAI($postedAfter: DateTime) {
    posts(topic: "artificial-intelligence", order: RANKING, postedAfter: $postedAfter, first: 20) {
      edges {
        node {
          name
          tagline
          url
          votesCount
          topics {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchProductHuntCandidates({
  token = process.env.PRODUCT_HUNT_TOKEN,
  hoursBack = 24,
  fetchImpl = fetch,
} = {}) {
  if (!token) {
    console.warn("PRODUCT_HUNT_TOKEN not set; skipping Product Hunt source");
    return [];
  }

  const res = await fetchImpl(PH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: QUERY, variables: { postedAfter: hoursAgoISO(hoursBack) } }),
  });

  if (!res.ok) {
    console.warn(`Product Hunt API error: ${res.status}; skipping`);
    return [];
  }

  const json = await res.json();
  const edges = json?.data?.posts?.edges ?? [];
  return edges.map(({ node }) => ({
    sourceKey: `ph:${node.url}`,
    name: node.name,
    description: node.tagline,
    url: node.url,
    tags: (node.topics?.edges ?? []).map((e) => e.node.name.toLowerCase()),
    score: node.votesCount ?? 0,
  }));
}
