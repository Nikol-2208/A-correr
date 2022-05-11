import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/index.scss";
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    AOS.init()
  },
}).$mount("#app");
