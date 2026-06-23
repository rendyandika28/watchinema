import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/Home.vue");
const Genres = () => import("../views/Genres.vue");
const Details = () => import("../views/Details.vue");
const Search = () => import("../views/Search.vue");
const Watchlist = () => import("../views/Watchlist.vue");
const NotFound = () => import("../views/NotFound.vue");

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/genres/:genres", name: "Genres", component: Genres },
  { path: "/details/:id", name: "Details", component: Details },
  { path: "/search/:name", name: "Search", component: Search },
  { path: "/watchlist", name: "Watchlist", component: Watchlist },
  { path: "*", name: "NotFound", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { selector: to.hash };
    return { x: 0, y: 0 };
  },
});

export default router;
