const BASE = "https://api.themoviedb.org/3";
const PARAMS = { api_key: process.env.VUE_APP_TMDB_KEY, language: "en-US" };

const cache = new Map();

function buildUrl(path) {
  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(PARAMS)) url.searchParams.set(k, v);
  return url.toString();
}

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return { data: await res.json() };
}

export async function getCached(path) {
  if (cache.has(path)) return cache.get(path);
  const result = await request(buildUrl(path));
  cache.set(path, result);
  return result;
}

export default {
  async get(path) {
    return request(buildUrl(path));
  },
};
