export function sourceOf(candidate) {
  return candidate.sourceKey?.split(":")[0] ?? "unknown";
}

export function filterByMinScore(candidates, minScoreBySource) {
  return candidates.filter((c) => (c.score || 0) >= (minScoreBySource[sourceOf(c)] ?? 0));
}

export function scoreCandidates(candidates) {
  const maxBySource = new Map();
  for (const c of candidates) {
    const source = sourceOf(c);
    maxBySource.set(source, Math.max(maxBySource.get(source) || 0, c.score || 0));
  }
  return candidates.map((c) => {
    const max = Math.max(1, maxBySource.get(sourceOf(c)) || 1);
    return { ...c, normalizedScore: (c.score || 0) / max };
  });
}

export function selectTop(candidates, n) {
  return scoreCandidates(candidates)
    .sort((a, b) => b.normalizedScore - a.normalizedScore)
    .slice(0, n);
}
