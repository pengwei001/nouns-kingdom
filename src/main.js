import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueAnalytics from "vue-analytics";

createApp(App)
  .use(VueAnalytics, {
    id: "UA-179016977-1",
    router
  })
  .mount("#app");
