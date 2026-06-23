import { getCached } from "../data/axios";

export async function getTrailerKey(movieId) {
  try {
    const { data } = await getCached(`/movie/${movieId}/videos`);
    const videos = data.results || [];
    const trailer = videos.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    return trailer?.key || null;
  } catch {
    return null;
  }
}
