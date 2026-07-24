export function normalizeUrl(url) {
  try {
    const u = new URL(url);
    return `${u.hostname}${u.pathname}`.replace(/\/$/, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

export function isDuplicateUrl(existingTools, url) {
  const target = normalizeUrl(url);
  return existingTools.some((t) => normalizeUrl(t.url) === target);
}

export function filterCandidates(candidates, { existingTools, seenSources }) {
  const seenSet = new Set(seenSources);
  const seenInBatch = new Set();
  const result = [];
  for (const candidate of candidates) {
    if (seenSet.has(candidate.sourceKey)) continue;
    if (isDuplicateUrl(existingTools, candidate.url)) continue;
    const key = normalizeUrl(candidate.url);
    if (seenInBatch.has(key)) continue;
    seenInBatch.add(key);
    result.push(candidate);
  }
  return result;
}
