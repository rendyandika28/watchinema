<template>
  <div class="wl">
    <Header @click.native="close" />
    <div class="wl__hero">
      <h1>Watchlist</h1>
      <p>Film yang kamu simpan</p>
    </div>
    <div class="wl__grid" v-if="movies.length">
      <div class="wl__card" v-for="m in movies" :key="m.id" @click="goDetail(m.id)">
        <img :src="m.imgUrl" :alt="m.title" loading="lazy" />
        <div class="wl__overlay">
          <h4>{{ m.title }}</h4>
          <button class="wl__remove" @click.stop="remove(m.id)">Hapus</button>
        </div>
      </div>
    </div>
    <div class="wl__empty" v-else>
      <p>Belum ada film di Watchlist.</p>
      <router-link to="/" class="wl__link">Jelajahi Film</router-link>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { get as getWatchlist, save as saveWatchlist } from "../utils/watchlist";

export default {
  name: "Watchlist",
  components: { Header },
  metaInfo: {
    title: "Watchlist — Film Tersimpan · Watchinema",
    meta: [
      { name: "description", content: "Film favorit yang kamu simpan di Watchinema." },
      { property: "og:title", content: "Watchlist — Watchinema" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: () => window.location.origin + "/watchlist" },
    ],
  },
  data() {
    return { movies: getWatchlist() };
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: "Details", params: { id } });
    },
    remove(id) {
      this.movies = this.movies.filter((m) => m.id !== id);
      saveWatchlist(this.movies);
    },
  },
};
</script>

<style scoped>
.wl {
  min-height: 100vh;
  background: var(--bg-auditorium);
}
.wl__hero {
  padding: 100px 48px 40px;
}
.wl__hero h1 {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.wl__hero p {
  color: var(--text-patina);
  font-size: 15px;
  margin-top: 4px;
}
.wl__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 48px 60px;
}
.wl__card {
  position: relative;
  width: 280px;
  height: 160px;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--border);
  transition: var(--transition);
  flex-shrink: 0;
}
.wl__card:hover {
  border-color: var(--accent-gold);
  transform: translateY(-2px);
}
.wl__card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.wl__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 10, 7, 0.9), transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 14px;
  gap: 6px;
}
.wl__overlay h4 {
  font-family: "Oswald", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.wl__remove {
  align-self: flex-start;
  background: none;
  border: 1px solid var(--curtain-red);
  color: var(--curtain-red);
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
}
.wl__remove:hover {
  background: var(--curtain-red);
  color: #fff;
}
.wl__empty {
  text-align: center;
  padding: 80px 24px;
  color: var(--text-patina);
}
.wl__empty p {
  font-size: 16px;
  margin-bottom: 16px;
}
.wl__link {
  color: var(--text-screenlight);
  text-decoration: none;
  font-family: "Oswald", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}
.wl__link:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
}

@media (max-width: 768px) {
  .wl__hero { padding: 80px 20px 24px; }
  .wl__hero h1 { font-size: 2rem; }
  .wl__grid {
    padding: 0 16px 40px;
    justify-content: center;
  }
  .wl__card { width: 100%; max-width: 380px; }
}
</style>
