<template>
  <div
    class="card"
    :style="{
      background:
        'linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.8) ),url(https://image.tmdb.org/t/p/original/' +
        movie.backdrop_path +
        ')',
    }"
    @click="directToDetail"
  >
    <div class="card__shine"></div>
    <div class="card__content">
      <div class="card__info">
        <h4>{{ movie.title || movie.name || movie.original_name }}</h4>
        <p>{{ truncate(movie.overview, 100) }}</p>
      </div>
      <div class="card__rating">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        {{ movie.vote_average }}
      </div>
    </div>
  </div>
</template>

<script>
import { truncate } from "../utils/utils";
export default {
  name: "FilmCard",
  props: ["movie", "fetchUrl"],
  data() {
    return { truncate };
  },
  methods: {
    directToDetail() {
      this.$router.push({
        name: "Details",
        params: { id: this.movie.id },
        query: { link: this.fetchUrl },
      });
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  margin: 5px;
  display: flex;
  align-items: flex-end;
  width: 380px;
  height: 220px;
  padding: 24px;
  box-sizing: border-box;
  border-radius: var(--radius-lg);
  background-size: cover !important;
  background-position: center !important;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: var(--transition);
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-lg);
}

.card__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(232, 221, 208, 0.04) 50%, transparent 60%);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s;
}
.card:hover .card__shine {
  opacity: 1;
}

.card__content {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 2;
  gap: 16px;
}

.card__info {
  flex: 1;
  min-width: 0;
}
.card__info h4 {
  font-family: "Oswald", sans-serif;
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 4px;
}
.card__info p {
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-patina);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--accent-gold);
  font-family: "JetBrains Mono", monospace;
  font-size: 14px;
  white-space: nowrap;
}

@media (max-width: 567px) {
  .card {
    width: 100%;
    height: 200px;
    margin: 5px 0;
  }
}
</style>
