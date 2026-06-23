<template>
  <div class="home">
    <Header />
    <Banner />
    <div class="home__content">
      <RowFilm titleRow="Trending Now" :fetchUrl="fetchTrending" :isRowPosters="true" />
      <RowFilm titleRow="Top Rated" :fetchUrl="fetchTopRated" />
      <div class="home__genres">
        <h2 class="home__genres-title">Jelajahi Genre</h2>
        <RowFilm titleRow="Action" :fetchUrl="fetchActionMovies" />
        <RowFilm titleRow="Comedy" :fetchUrl="fetchComedyMovies" />
        <RowFilm titleRow="Horror" :fetchUrl="fetchHorrorMovies" />
        <RowFilm titleRow="Romance" :fetchUrl="fetchRomanceMovies" />
        <RowFilm titleRow="Documentary" :fetchUrl="fetchDocumentaries" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Banner from "../components/Banner";
import RowFilm from "../components/RowFilm";
import Footer from "../components/Footer";
import requests from "../data/request.js";

export default {
  name: "Home",
  metaInfo: {
    title: "Watchinema — Bioskop Mini dalam Genggaman",
    meta: [
      { name: "description", content: "Jelajahi ribuan trailer film dan series. Temukan tontonan baru dari berbagai genre tanpa ribet login." },
      { property: "og:title", content: "Watchinema — Bioskop Mini dalam Genggaman" },
      { property: "og:description", content: "Jelajahi ribuan trailer film dan series. Temukan tontonan baru dari berbagai genre tanpa ribet login." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.origin },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  },
  components: { Header, Banner, RowFilm, Footer },
  data() {
    return {
      ...requests,
    };
  },
};
</script>

<style scoped>
.home {
  background: var(--bg-auditorium);
  min-height: 100vh;
}

.home__content {
  padding-bottom: 40px;
}

.home__genres {
  border-top: 1px solid var(--border);
  margin-top: 32px;
  padding-top: 8px;
}

.home__genres-title {
  font-family: "Oswald", sans-serif;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-patina);
  padding: 16px 48px;
}

@media (max-width: 768px) {
  .home__genres-title {
    padding: 16px 20px;
    font-size: 14px;
  }
}
</style>
