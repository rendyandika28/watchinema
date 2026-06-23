<template>
  <div class="banner">
    <div
      class="banner__hero"
      :style="!loading && heroBanner.backdrop_path ? {
        background:
          'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.85) ),url(https://image.tmdb.org/t/p/original/' +
          heroBanner.backdrop_path + ')' || null,
      } : {}"
    >
      <div class="banner__content" v-if="!loading">
        <div class="banner__marquee">
          <h1 class="banner__title">
            {{ heroBanner.title || heroBanner.name || heroBanner.original_name }}
          </h1>
        </div>
        <div class="banner__meta">
          <span class="banner__rating">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {{ heroBanner.vote_average }}
          </span>
          <span class="banner__sep">|</span>
          <span class="banner__year" v-if="heroBanner.release_date">{{
            heroBanner.release_date.slice(0, 4)
          }}</span>
        </div>
        <p class="banner__desc">
          {{ truncate(heroBanner.overview, 200) }}
        </p>
        <div class="banner__actions">
          <Button
            @button-click="detailMovieBanner(heroBanner.id)"
            title="Details"
            variant="secondary"
            compact
          />
          <Button
            v-if="!trailerUrl"
            @button-click="playVideo"
            title="Watch Trailer"
            variant="secondary"
          />
        </div>
      </div>
      <div class="banner__skeleton" v-else>
        <div class="banner__sk-title">
          <Skeleton height="72px" radius="var(--radius-md)" />
        </div>
        <div class="banner__sk-meta">
          <Skeleton width="60px" height="18px" radius="4px" />
          <Skeleton width="40px" height="18px" radius="4px" />
        </div>
        <div class="banner__sk-desc">
          <Skeleton height="14px" />
          <Skeleton height="14px" width="85%" />
          <Skeleton height="14px" width="65%" />
        </div>
        <div class="banner__actions">
          <Skeleton width="120px" height="40px" radius="var(--radius-sm)" />
          <Skeleton width="160px" height="48px" radius="var(--radius-sm)" />
        </div>
      </div>
      <div class="banner__gradient"></div>
    </div>

    <div v-if="trailerUrl" class="banner__cinema">
      <div class="banner__screen">
        <youtube
          :video-id="trailerUrl"
          ref="youtube"
          width="100%"
          height="100%"
        />
        <button class="banner__close" @click="trailerUrl = null" aria-label="Close trailer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import Skeleton from "./Skeleton";
import { getCached } from "../data/axios.js";
import requests from "../data/request.js";
import { truncate } from "../utils/utils";
import { getTrailerKey } from "../utils/trailer";

export default {
  name: "Banner",
  components: { Button, Skeleton },
  data() {
    return {
      heroBanner: { backdrop_path: null },
      loading: true,
      truncate,
      trailerUrl: null,
    };
  },
  methods: {
    detailMovieBanner(id) {
      this.$router.push({
        name: "Details",
        params: { id },
        query: { link: requests.fetchTrending },
      });
    },
    async playVideo() {
      if (this.trailerUrl) {
        this.trailerUrl = null;
        return;
      }
      const key = await getTrailerKey(this.heroBanner.id);
      if (key) {
        this.trailerUrl = key;
      } else {
        this.$swal("Sorry", "Trailer not available", "warning");
      }
    },
  },
  async mounted() {
    const request = await getCached(requests.fetchTrending);
    this.heroBanner = request.data.results[
      Math.floor(Math.random() * request.data.results.length - 1)
    ];
    this.loading = false;
  },
};
</script>

<style scoped>
.banner__hero {
  position: relative;
  width: 100%;
  min-height: 620px;
  background-size: cover !important;
  background-position: center top !important;
  display: flex;
  align-items: flex-end;
}

.banner__content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  padding: 0 48px 100px;
}

.banner__skeleton {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 48px 100px;
  max-width: 640px;
  position: relative;
  z-index: 2;
  width: 100%;
}

.banner__sk-title {
  max-width: 520px;
}

.banner__sk-meta {
  display: flex;
  gap: 10px;
}

.banner__sk-desc {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 520px;
}

.banner__marquee {
  position: relative;
}
.banner__marquee::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -10%;
  width: 120%;
  height: 200%;
  background: radial-gradient(ellipse at 50% 50%, rgba(212, 160, 23, 0.12) 0%, transparent 65%);
  transform: translateY(-50%);
  pointer-events: none;
}

.banner__title {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 4rem;
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.banner__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  margin-bottom: 16px;
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  color: var(--text-patina);
}

.banner__rating {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--accent-gold);
}

.banner__sep {
  color: var(--text-dim);
}

.banner__desc {
  font-size: 15px;
  line-height: 1.75;
  color: var(--text-patina);
  margin-bottom: 28px;
  max-width: 520px;
}

.banner__actions {
  display: flex;
  gap: 12px;
}

.banner__gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(transparent, var(--bg-auditorium));
  z-index: 1;
  pointer-events: none;
}

/* ── Cinema section ── */

.banner__cinema {
  background: #000;
  padding: 40px 48px 60px;
  animation: cinemaFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cinemaFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner__screen {
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

.banner__screen youtube,
.banner__screen iframe {
  width: 100%;
  height: 100%;
  display: block;
}

.banner__close {
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
.banner__close:hover {
  opacity: 1;
  background: var(--curtain-red);
}

@media (max-width: 768px) {
  .banner__hero {
    min-height: 420px;
    background-position: center 20% !important;
  }
  .banner__content {
    padding: 0 16px 50px;
  }
  .banner__skeleton {
    padding: 0 16px 50px;
    max-width: 100%;
  }
  .banner__title {
    font-size: 2rem;
  }
  .banner__desc {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .banner__actions {
    flex-wrap: wrap;
  }
  .banner__cinema {
    padding: 20px 16px 40px;
  }
  .banner__close {
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 420px) {
  .banner__hero {
    min-height: 360px;
  }
  .banner__title {
    font-size: 1.6rem;
  }
  .banner__content {
    padding: 0 12px 40px;
  }
}
</style>
