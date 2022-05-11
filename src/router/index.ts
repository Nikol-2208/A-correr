import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Invoice from "../views/Invoice.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/invoice/:id",
    name: "Invoice",
    component: Invoice,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
