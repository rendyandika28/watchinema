import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Genres from "../views/Genres.vue";
import Details from "../views/Details.vue";
import Search from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/genres/:genres",
    name: "Genres",
    component: Genres,
  },
  {
    path: "/details/:id",
    name: "Details",
    component: Details,
  },
  {
    path: "/search/:name",
    name: "Search",
    component: Search,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
