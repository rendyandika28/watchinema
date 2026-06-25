# Watchinema

Mini cinema in your pocket — browse movies, watch trailers, save watchlist. No login required.

### Tech Stack

- **Vue 2** — SPA
- **Vue Router** — history mode, code-splitting per route
- **Vue Meta** — dynamic OG tags / SEO per page
- **TMDB API** — data film & trailer
- **Pure CSS** — dark cinema theme, skeleton shimmer, no UI lib

### Dependency Philosophy

Zero runtime deps besides Vue, Router, and Meta. HTTP via native `fetch`, video embed via native `<iframe>`, notifications via native `alert()`.

### Setup

```
cp .env.example .env
# fill VUE_APP_TMDB_KEY with your API key from https://themoviedb.org
npm install
npm run serve
```

### Build

```
npm run build
npx serve -s dist -l 3000
```
