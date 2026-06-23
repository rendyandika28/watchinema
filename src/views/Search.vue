<template>
  <div class="search">
    <Header />
    <div class="search__banner">
      <h1>Hasil pencarian <span>{{ query }}</span></h1>
    </div>
    <div class="search__grid" v-if="!loading">
      <FilmCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :fetchUrl="fetchUrl"
      />
    </div>
    <div class="search__sk" v-else>
      <div v-for="i in 8" :key="i">
        <Skeleton width="380px" height="220px" radius="var(--radius-lg)" />
      </div>
    </div>
    <div class="search__empty" v-if="!loading && !movies.length">
      <p>Tidak ditemukan untuk "<strong>{{ query }}</strong>"</p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import FilmCard from "../components/FilmCard";
import Skeleton from "../components/Skeleton";
import axios from "../data/axios";

export default {
  name: "Search",
  metaInfo() {
    const q = this.query;
    return {
      title: `"${q}" — Pencarian · Watchinema`,
      meta: [
        { name: "description", content: `Hasil pencarian untuk "${q}" — temukan trailer film favorit kamu di Watchinema.` },
        { property: "og:title", content: `"${q}" — Pencarian · Watchinema` },
        { property: "og:description", content: `Hasil pencarian film "${q}" di Watchinema.` },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://watchinema.app/search/${encodeURIComponent(q)}` },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  components: { Header, FilmCard, Skeleton },
  data() {
    return {
      movies: [],
      loading: true,
    };
  },
  computed: {
    query() {
      return this.$route.params.name || "";
    },
    fetchUrl() {
      return `/search/movie?query=${encodeURIComponent(this.query)}&include_adult=false`;
    },
  },
  methods: {
    async fetchMovies() {
      this.loading = true;
      try {
        const { data } = await axios.get(this.fetchUrl);
        this.movies = data.results || [];
      } catch {
        this.movies = [];
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchMovies();
  },
  watch: {
    $route() {
      this.fetchMovies();
    },
  },
};
</script>

<style scoped>
.search {
  min-height: 100vh;
  background: var(--bg-auditorium);
}

.search__banner {
  padding: 120px 48px 40px;
}
.search__banner h1 {
  font-family: "Lora", serif;
  font-weight: 400;
  font-size: 20px;
  color: var(--text-patina);
}
.search__banner span {
  font-family: "Oswald", sans-serif;
  font-weight: 600;
  font-size: 26px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--accent-gold);
  margin-left: 6px;
}

.search__grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 48px 60px;
}

.search__sk {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 48px 60px;
  pointer-events: none;
}

.search__empty {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-dim);
  font-family: "Lora", serif;
  font-style: italic;
  font-size: 16px;
}
.search__empty strong {
  color: var(--text-patina);
}

@media (max-width: 768px) {
  .search__banner {
    padding: 100px 16px 24px;
  }
  .search__grid {
    padding: 0 12px 40px;
    gap: 4px;
  }
}
</style>
