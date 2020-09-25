import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import gtag from "vue-gtag-next";

const app = createApp(App);
app.use(gtag, {
  property: {
    id: "UA-179016977-1"
  }
});
app.use(router).mount("#app");
