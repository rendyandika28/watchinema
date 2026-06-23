<template>
  <div class="genres">
    <Header />
    <div
      class="genres__hero"
      :style="{
        background:
          'linear-gradient( rgba(13, 10, 7, 0.6), rgba(13, 10, 7, 0.85) ),url(https://image.tmdb.org/t/p/original/' +
          showingBanner +
          ')',
      }"
    >
      <h1>{{ titleDisplay }}</h1>
      <p>Pilihan <span>Watchinema</span></p>
    </div>
    <div class="genres__grid" v-if="!loading">
      <FilmCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :fetchUrl="fetchUrl"
      />
    </div>
    <div class="genres__sk" v-else>
      <div v-for="i in 12" :key="i">
        <Skeleton width="380px" height="220px" radius="var(--radius-lg)" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import FilmCard from "../components/FilmCard";
import Skeleton from "../components/Skeleton";
import axios from "../data/axios";
import Footer from "../components/Footer";

export default {
  name: "Genres",
  metaInfo() {
    const g = this.titleDisplay || "Genre";
    return {
      title: `${g} — Film · Watchinema`,
      meta: [
        { name: "description", content: `Koleksi film genre ${g} — tonton trailer dan temukan film favorit baru di Watchinema.` },
        { property: "og:title", content: `${g} — Film · Watchinema` },
        { property: "og:description", content: `Koleksi film genre ${g} di Watchinema.` },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://watchinema.app/genres/${encodeURIComponent(g)}` },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  components: { Header, FilmCard, Skeleton, Footer },
  data() {
    return {
      fetchUrl: "",
      movies: [],
      loading: true,
      showingBanner: null,
    };
  },
  computed: {
    titleDisplay() {
      return typeof this.$route.params.genres === "string"
        ? this.$route.params.genres.replace("Movies", "").trim()
        : "";
    },
  },
  async loadGenre(link) {
    this.fetchUrl = link;
    this.loading = true;
    const { data } = await axios.get(link);
    this.movies = data.results || [];
    this.loading = false;
    this.showingBanner = this.movies[
      Math.floor(Math.random() * this.movies.length - 1)
    ]?.backdrop_path;
  },
  async mounted() {
    await this.loadGenre(this.$route.query.link);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadGenre(to.query.link);
    next();
  },
};
</script>

<style scoped>
.genres {
  min-height: 100vh;
  background: var(--bg-auditorium);
}

.genres__hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 48px;
  height: 280px;
  background-size: cover !important;
  background-position: center !important;
}
.genres__hero h1 {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.genres__hero p {
  color: var(--text-patina);
  font-size: 15px;
  margin-top: 4px;
}
.genres__hero span {
  color: var(--accent-gold);
  font-weight: 600;
}

.genres__grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 40px 48px;
}

.genres__sk {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 40px 48px;
  pointer-events: none;
}

@media (max-width: 768px) {
  .genres__hero {
    padding-left: 24px;
  }
  .genres__hero h1 {
    font-size: 2rem;
  }
  .genres__grid {
    padding: 20px 16px;
  }
}
</style>
