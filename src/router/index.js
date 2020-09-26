import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import Word from "../views/Word.vue";
import CategoryJSON from "../../public/db_category.JSON";

const categories = CategoryJSON.category;
let routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

categories.forEach(item => {
  const newRoute = {
    path: "/" + item,
    name: item,
    component: Category
  };
  const newCardRoute = {
    path: "/" + item + "/:id",
    name: item + "WithParam",
    component: Word
  };
  routes.push(newRoute);
  routes.push(newCardRoute);
});

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
