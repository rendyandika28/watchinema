<template>
  <div class="details">
    <div
      class="details__hero"
      :style="{
        background:
          'linear-gradient( rgba(13, 10, 7, 0.65), rgba(13, 10, 7, 0.92) ), ' +
          bgHero,
      }"
    >
      <Header />
      <div class="details__layout" v-if="!loading">
        <img :src="imagePoster" alt="" class="details__poster" loading="lazy" />
        <div class="details__info">
          <div class="details__marquee">
            <h1 class="details__title">{{ title }}</h1>
          </div>
          <div class="details__meta">
            <span class="details__rating" v-if="movie.vote_average">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {{ movie.vote_average }}
            </span>
            <span class="details__sep">|</span>
            <span v-if="movie.release_date">{{ movie.release_date.slice(0, 4) }}</span>
            <span class="details__sep" v-if="movieGenres.length">|</span>
            <span>{{ movieGenres.join(", ") }}</span>
          </div>
          <p class="details__overview" v-if="movie.overview">{{ movie.overview }}</p>
          <div class="details__actions">
            <Button
              v-if="!trailerUrl"
              @button-click="playVideo"
              title="Watch Trailer"
              variant="secondary"
            />
            <Button
              @button-click="handleClickFavorite"
              :title="isMatch ? 'Remove from Watchlist' : 'Add to Watchlist'"
              variant="primary"
              compact
            />
          </div>
        </div>
      </div>
      <div class="details__layout details__sk" v-else>
        <Skeleton width="280px" height="420px" radius="var(--radius-lg)" class="details__sk-poster" />
        <div class="details__sk-info">
          <div class="details__sk-title-w">
            <Skeleton height="48px" radius="var(--radius-md)" />
          </div>
          <div class="details__sk-meta">
            <Skeleton width="60px" height="18px" radius="4px" />
            <Skeleton width="40px" height="18px" radius="4px" />
            <Skeleton width="120px" height="18px" radius="4px" />
          </div>
          <div class="details__sk-desc">
            <Skeleton height="14px" />
            <Skeleton height="14px" width="92%" />
            <Skeleton height="14px" width="78%" />
            <Skeleton height="14px" width="85%" />
          </div>
          <div class="details__actions">
            <Skeleton width="140px" height="48px" radius="var(--radius-sm)" />
            <Skeleton width="180px" height="40px" radius="var(--radius-sm)" />
          </div>
        </div>
      </div>
    </div>
    <div class="details__cinema" v-if="trailerUrl">
      <div class="details__screen">
        <youtube :video-id="trailerUrl" ref="youtube" width="100%" height="100%" />
        <button class="details__close" @click="trailerUrl = null" aria-label="Close trailer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>
    <div class="details__similar">
      <RowFilm
        titleRow="Similar Movies"
        :fetchUrl="movieCategoryLink"
        :isRowPosters="true"
      />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Button from "../components/Button";
import RowFilm from "../components/RowFilm";
import Skeleton from "../components/Skeleton";
import { getCached } from "../data/axios";
import { getTrailerKey } from "../utils/trailer";

const WATCHLIST_KEY = "watchinema_watchlist";

function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWatchlist(list) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}

export default {
  name: "Details",
  metaInfo() {
    const t = this.title || "Movie";
    const desc = this.movie.overview
      ? this.movie.overview.slice(0, 160)
      : "Tonton trailer film di Watchinema.";
    const poster = this.movie.poster_path
      ? `https://image.tmdb.org/t/p/original${this.movie.poster_path}`
      : "";
    return {
      title: `${t} — Watchinema`,
      meta: [
        { name: "description", content: desc },
        { property: "og:title", content: `${t} — Watchinema` },
        { property: "og:description", content: desc },
        { property: "og:image", content: poster },
        { property: "og:type", content: "video.movie" },
        { property: "og:url", content: `https://watchinema.app/details/${this.movieID}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  components: { Header, Button, RowFilm, Skeleton },
  data() {
    return {
      movie: {},
      loading: true,
      movieID: "",
      movieCategoryLink: this.$route.query.link,
      movieGenres: [],
      baseUrl: "https://image.tmdb.org/t/p/original/",
      trailerUrl: "",
      isMatch: false,
    };
  },
  methods: {
    async loadMovie(to) {
      this.movieID = to ? to.params.id : this.$route.params.id;
      const { data } = await getCached("/movie/" + this.movieID);
      this.movie = data;
      this.movieGenres = data.genres ? data.genres.map((g) => g.name) : [];
    },
    async playVideo() {
      if (this.trailerUrl) return;
      const key = await getTrailerKey(this.movieID);
      if (key) {
        this.trailerUrl = key;
      } else {
        this.$swal("Sorry", "Trailer not available", "warning");
      }
    },
    handleClickFavorite() {
      const list = getWatchlist();
      if (!this.isMatch) {
        list.push({
          id: this.movieID,
          title:
            this.movie.title || this.movie.name || this.movie.original_name,
          imgUrl: `${this.baseUrl}${this.movie.backdrop_path}`,
          timestamp: Date.now(),
        });
        saveWatchlist(list);
        this.$toast.success("Saved to Watchlist", { duration: 3000, position: "top" });
        this.isMatch = true;
      } else {
        const idx = list.findIndex((m) => m.id === this.movieID);
        if (idx !== -1) list.splice(idx, 1);
        saveWatchlist(list);
        this.$toast.warning("Removed from Watchlist", { duration: 3000, position: "top" });
        this.isMatch = false;
      }
    },
    isFilmHasFavorite() {
      this.isMatch = getWatchlist().some((m) => m.id === this.movieID);
    },
  },
  async mounted() {
    await this.loadMovie();
    this.loading = false;
    window.scrollTo(0, 0);
    this.isFilmHasFavorite();
  },
  computed: {
    title() {
      return this.movie.title || this.movie.name || this.movie.original_name;
    },
    imagePoster() {
      return `${this.baseUrl}${this.movie.poster_path}`;
    },
    bgHero() {
      return (
        "url(https://image.tmdb.org/t/p/original/" +
          this.movie.backdrop_path +
          ")" || null
      );
    },
  },
  watch: {
    async $route(to) {
      await this.loadMovie(to);
    },
  },
};
</script>

<style scoped>
.details__hero {
  min-height: 600px;
  background-size: cover !important;
  background-position: center top !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.details__layout {
  display: flex;
  align-items: center;
  gap: 48px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 48px 60px;
  width: 100%;
  box-sizing: border-box;
}

.details__poster {
  width: 280px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  flex-shrink: 0;
}

.details__info {
  flex: 1;
  min-width: 0;
}

.details__marquee {
  position: relative;
}
.details__marquee::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -8%;
  width: 116%;
  height: 200%;
  background: radial-gradient(ellipse at 50% 50%, rgba(212, 160, 23, 0.1) 0%, transparent 65%);
  transform: translateY(-50%);
  pointer-events: none;
}

.details__title {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.details__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  color: var(--text-patina);
}

.details__rating {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--accent-gold);
}

.details__sep {
  color: var(--text-dim);
}

.details__overview {
  color: var(--text-patina);
  font-size: 15px;
  line-height: 1.75;
  margin-bottom: 28px;
}

.details__actions {
  display: flex;
  gap: 12px;
}

.details__cinema {
  background: #000;
  padding: 40px 48px;
  animation: cinemaFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cinemaFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.details__screen {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 16 / 9;
  box-shadow:
    0 0 0 1px rgba(212, 160, 23, 0.15),
    0 0 40px rgba(212, 160, 23, 0.08),
    0 20px 60px rgba(0, 0, 0, 0.5);
  background: #000;
}

.details__screen youtube,
.details__screen iframe {
  width: 100%;
  height: 100%;
  display: block;
}

.details__close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  cursor: pointer;
  transition: var(--transition);
  opacity: 0.7;
}
.details__close:hover {
  opacity: 1;
  background: var(--curtain-red);
}

.details__sk {
  pointer-events: none;
}

.details__sk-poster {
  flex-shrink: 0;
}

.details__sk-title-w {
  max-width: 90%;
}

.details__sk-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.details__sk-meta {
  display: flex;
  gap: 10px;
}

.details__sk-desc {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.details__similar {
  padding-bottom: 40px;
}

@media (max-width: 768px) {
  .details__hero {
    min-height: auto;
  }
  .details__layout {
    flex-direction: column;
    padding: 80px 20px 40px;
    gap: 24px;
    text-align: center;
  }
  .details__poster {
    width: 200px;
  }
  .details__sk-poster {
    width: 200px;
    height: 300px;
  }
  .details__title {
    font-size: 2rem;
  }
  .details__meta {
    justify-content: center;
  }
  .details__overview {
    text-align: left;
  }
  .details__actions {
    justify-content: center;
  }
  .details__cinema {
    padding: 20px 16px;
  }
  .details__close {
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 420px) {
  .details__layout {
    padding: 70px 16px 30px;
  }
  .details__poster {
    width: 160px;
  }
  .details__sk-poster {
    width: 160px;
    height: 240px;
  }
  .details__title {
    font-size: 1.5rem;
  }
}
</style>
