import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import Word from "../views/Word.vue";

const categories = ["animals", "foods", "tools"];
let routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

categories.forEach((item) => {
  const newRoute = {
    path: "/" + item,
    name: item,
    component: Category,
  };
  const newCardRoute = {
    path: "/" + item + "/:id",
    name: item + "WithParam",
    component: Word,
  };
  routes.push(newRoute);
  routes.push(newCardRoute);
});

console.log("router: ", routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
