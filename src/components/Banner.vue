<template>
  <div
    class="banner"
    :style="{
      background:
        'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),' +
        bannerBackground +
        '',
    }"
  >
    <div class="banner__contents">
      <h1 class="banner__title">
        {{ heroBanner.title || heroBanner.name || heroBanner.original_name }}
      </h1>
      <p class="banner__directors">Rating: {{ heroBanner.vote_average }}/10</p>
      <p class="banner__description">
        {{ truncate(heroBanner.overview, 200) }}
      </p>

      <div class="banner__buttons">
        <Button
          @button-click="detailMovieBanner(heroBanner.id)"
          title="Details"
          bcolor="#333"
          size="normal"
        ></Button>
        <Button
          v-if="showFilm"
          @button-click="playVideo"
          title="Watch Trailers"
          bcolor="#333"
          size
        ></Button>
      </div>
    </div>
    <div class="banner__fadeBottom"></div>
    <youtube
      class="frameVideo"
      v-if="trailerUrl && heroBanner"
      :video-id="trailerUrl"
      width="100%"
      height="460"
    ></youtube>
  </div>
</template>

<script>
import Button from "./Button";
import axios from "../data/axios.js";
import requests from "../data/request.js";
import { truncate } from "../utils/utils";
import movieTrailer from "movie-trailer";

export default {
  name: "Banner",
  components: {
    Button,
  },
  data() {
    return {
      heroBanner: {
        backdrop_path: null,
      },
      truncate,
      trailerUrl: null,
    };
  },
  methods: {
    setBanner(data) {
      this.heroBanner = data;
    },

    // Get Data from API
    fetchData: async () => {
      const request = await axios.get(requests.fetchTrending);
      return request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ];
    },

    // Direct to detail Movie
    detailMovieBanner(id) {
      this.$router.push({
        name: "Details",
        params: { id: id },
        query: { link: requests.fetchTrending },
      });
    },

    // Play the video trailer
    playVideo() {
      if (this.trailerUrl) {
        this.trailerUrl = null;
        console.log("null", this.trailerUrl);
      } else {
        movieTrailer(this.heroBanner.title || "")
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            this.trailerUrl = urlParams.get("v");
            console.log("fill", this.trailerUrl);
          })
          .catch(() => this.$swal("Maaf", "Video tidak ditemukan", "warning"));
      }
    },
  },

  async mounted() {
    this.setBanner(await this.fetchData());
  },

  computed: {
    bannerExistence() {
      return this.heroBanner && this.heroBanner.backdrop_path;
    },
    showFilm() {
      return this.trailerUrl ? false : true;
    },
    bannerBackground() {
      return (
        "url(https://image.tmdb.org/t/p/original/" +
          this.heroBanner.backdrop_path +
          ")" || null
      );
    },
  },
};
</script>

<style>
.banner {
  color: white;
  object-fit: contain;
  min-height: 500px;
  border: 1px solid black;
  background-size: cover !important;
  margin-bottom: 50px;
}

.banner__contents {
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
}

.banner__directors {
  margin-top: 0;
  margin-bottom: 30px;
}

.banner__title {
  font-size: 3rem;
  font-weight: 800;
}

.banner__description {
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 0.9rem;
  max-width: 560px;
  height: 80px;
}

.banner__fadeBottom {
  height: 10.6rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
}

@media (max-width: 567px) {
  .banner {
    background-position: center center !important;
  }
  .banner__description {
    max-width: 300px;
  }
}
</style>