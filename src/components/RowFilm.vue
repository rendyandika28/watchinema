<template>
  <div>
    <div class="row" v-if="movies.length >= 1">
      <div class="row__header">
        <h2 class="row__title">{{ titleRow }}</h2>
        <router-link
          :to="{
            name: 'Genres',
            params: { genres: titleRow },
            query: { link: fetchUrl },
          }"
          class="row__see-all"
        >View All</router-link>
      </div>
      <div class="row__track-wrap">
        <div class="row__track">
          <router-link
            :key="movie.id"
            v-for="movie in movies.slice(0, 8)"
            :to="{
              name: 'Details',
              params: { id: movie.id },
              query: { link: fetchUrl },
            }"
            class="row__card"
          >
            <div class="row__frame">
              <img
                v-if="movie.poster_path"
                :src="baseUrl + (isRowPosters ? movie.poster_path : movie.backdrop_path)"
                :alt="movie.title || movie.name"
                loading="lazy"
              />
              <div class="row__overlay">
                <span>Details</span>
              </div>
            </div>
            <p class="row__label">
              {{ movie.title || movie.name || movie.original_name }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row row--sk" v-else-if="loading">
      <div class="row__header">
        <Skeleton height="24px" width="160px" radius="4px" />
        <Skeleton height="16px" width="60px" radius="4px" />
      </div>
      <div class="row__track-wrap">
        <div class="row__track">
          <div class="row__card row__card--sk" v-for="i in 8" :key="i">
            <Skeleton width="170px" height="255px" radius="var(--radius-md)" />
            <Skeleton height="16px" width="120px" radius="4px" />
          </div>
        </div>
      </div>
    </div>
    <div class="row--empty" v-else>
      <h2>No results found</h2>
    </div>
  </div>
</template>

<script>
import { getCached } from "../data/axios.js";
import Skeleton from "./Skeleton";

export default {
  name: "RowFilm",
  components: { Skeleton },
  props: ["titleRow", "fetchUrl", "isRowPosters"],
  data() {
    return {
      movies: [],
      loading: true,
      baseUrl: "https://image.tmdb.org/t/p/original/",
    };
  },
  async mounted() {
    const { data } = await getCached(this.fetchUrl);
    this.movies = data.results || [];
    this.loading = false;
  },
};
</script>

<style scoped>
.row {
  margin: 36px 0;
  padding: 0 48px;
}

.row--sk {
  pointer-events: none;
}

.row__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.row__title {
  font-family: "Oswald", sans-serif;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-screenlight);
}

.row__see-all {
  color: var(--text-patina);
  text-decoration: none;
  font-family: "Lora", serif;
  font-size: 13px;
  transition: var(--transition);
}
.row__see-all:hover {
  color: var(--accent-gold);
}

.row__track {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 16px;
  scroll-snap-type: x mandatory;
}
.row__track::-webkit-scrollbar {
  height: 4px;
}
.row__track::-webkit-scrollbar-thumb {
  background: var(--bg-muted);
  border-radius: 2px;
}

.row__track-wrap {
  position: relative;
}
.row__track-wrap::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 8px;
  width: 40px;
  background: linear-gradient(to left, var(--bg-auditorium), transparent);
  pointer-events: none;
  z-index: 1;
}

.row__card {
  flex-shrink: 0;
  scroll-snap-align: start;
  width: 170px;
  text-decoration: none;
}

.row__card--sk {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row__frame {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-card);
  aspect-ratio: 2 / 3;
  box-shadow: var(--shadow-sm);
}
.row__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.row__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 10, 7, 0.85), transparent 60%);
  display: flex;
  align-items: flex-end;
  padding: 14px;
  opacity: 0;
  transition: var(--transition);
}
.row__overlay span {
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-gold);
}

.row__card:hover .row__frame img {
  transform: scale(1.08);
}
.row__card:hover .row__overlay {
  opacity: 1;
}

.row__label {
  color: var(--text-patina);
  font-size: 13px;
  margin-top: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.row--empty {
  text-align: center;
  padding: 60px 20px;
}
.row--empty h2 {
  font-family: "Lora", serif;
  font-weight: 400;
  color: var(--text-dim);
  font-style: italic;
}

@media (max-width: 768px) {
  .row {
    padding: 0 16px;
  }
  .row__card {
    width: 140px;
  }
}
</style>
