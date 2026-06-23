import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import VueToast from "vue-toast-notification";
import VueYoutube from "vue-youtube";
import VueMeta from "vue-meta";

import "vue-toast-notification/dist/theme-default.css";

Vue.use(VueYoutube);
Vue.use(VueSweetalert2);
Vue.use(VueToast);
Vue.use(VueMeta);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
