import axios from "axios";

const API_KEY = "f15d819549589d708cf177ff07116a0a";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: API_KEY, language: "en-US" },
});

const cache = new Map();

export async function getCached(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await instance.get(url);
  cache.set(url, res);
  return res;
}

export default instance;
