import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Grid from "vue-js-grid";

Vue.config.productionTip = false;
Vue.use(Grid);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
