const username = 'armash66';
let cache;
let pending;
async function refresh(year) {
  const query = `query { matchedUser(username: "${username}") { submitStatsGlobal { acSubmissionNum { difficulty count } } userCalendar(year: ${year}) { submissionCalendar } } }`;
  const response = await fetch('https://leetcode.com/graphql/', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }), signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error('LeetCode unavailable');
  const json = await response.json();
  const user = json.data?.matchedUser;
  if (json.errors || !user?.userCalendar || !Array.isArray(user.submitStatsGlobal?.acSubmissionNum)) throw new Error('Invalid profile');
  const solved = {};
  for (const item of user.submitStatsGlobal.acSubmissionNum) {
    if (Number.isInteger(item.count) && item.count >= 0) solved[item.difficulty.toLowerCase()] = item.count;
  }
  if (!['all', 'easy', 'medium', 'hard'].every(k => Number.isInteger(solved[k]))) throw new Error('Missing totals');
  const calendar = JSON.parse(user.userCalendar.submissionCalendar);
  const counts = new Map();
  for (const [timestamp, count] of Object.entries(calendar)) {
    const date = new Date(Number(timestamp) * 1000);
    if (!Number.isFinite(date.getTime()) || !Number.isInteger(count) || count < 0) continue;
    const day = date.toISOString().slice(0, 10);
    counts.set(day, (counts.get(day) || 0) + count);
  }
  const days = [];
  const now = new Date();
  const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  for (let t = Date.UTC(year, 0, 1); t <= end; t += 86400000) {
    const date = new Date(t).toISOString().slice(0, 10);
    days.push({ date, count: counts.get(date) || 0 });
  }
  cache = { username, year, solved, days, fetchedAt: new Date().toISOString() };
  return cache;
}
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET'); res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
  const year = new Date().getUTCFullYear();
  try {
    if (!cache || cache.year !== year || Date.now() - Date.parse(cache.fetchedAt) > 3600000) {
      pending ??= refresh(year).finally(() => { pending = undefined; });
      await pending;
    }
    res.end(JSON.stringify({ ...cache, stale: false }));
  } catch {
    if (cache) return res.end(JSON.stringify({ ...cache, stale: true }));
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'Practice calendar temporarily unavailable' }));
  }
}
