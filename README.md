# Watchinema

Mini cinema in your pocket — browse movies, watch trailers, save watchlist. No login required.

![Project Preview](https://rdydika.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdpaqb7s4w%2Fimage%2Fupload%2Fq_auto%2Cf_auto%2Fv1782218477%2Frdydika%2Fportfolio%2FWatchinema%2520Large.jpg&w=1536&q=75)

### Tech Stack

- **Vue 2** — SPA with route-level code splitting
- **Vue Router** — history mode, scroll behavior
- **Vue Meta** — dynamic OG tags & SEO per page
- **TMDB API** — movie data & trailer keys
- **Pure CSS** — dark cinema theme, skeleton shimmer, no UI lib

### Dependency Philosophy

Zero runtime deps besides Vue, Router, and Meta. HTTP via native `fetch`, video embed via native `<iframe>`, notifications via native `alert()`.

### Features

- Browse trending, top rated, and genre-sorted movies
- Watch YouTube trailers
- Save/remove watchlist (localStorage, no login)
- Search movies
- Fully responsive (mobile, tablet, desktop)
- Skeleton loading states, no layout shift
- SEO meta per page (OG tags, title, description)

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

Built with Coolify — `nixpacks.toml` included.
