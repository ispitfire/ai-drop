const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function daysSince(dateISO, todayISO) {
  return Math.floor((new Date(todayISO) - new Date(dateISO)) / MS_PER_DAY);
}

export function recomputeFreshness(tools, todayISO, windowDays = 7) {
  return tools.map((t) => (t.addedAt ? { ...t, isNew: daysSince(t.addedAt, todayISO) <= windowDays } : t));
}

export function setFeatured(tools, featuredId) {
  return tools.map((t) => ({ ...t, featured: t.id === featuredId }));
}
