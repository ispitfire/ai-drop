export function hoursAgoUnix(hours = 24, now = Date.now()) {
  return Math.floor((now - hours * 60 * 60 * 1000) / 1000);
}

export function hoursAgoISO(hours = 24, now = Date.now()) {
  return new Date(now - hours * 60 * 60 * 1000).toISOString();
}

export function daysAgoDateString(days = 1, now = Date.now()) {
  return new Date(now - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
