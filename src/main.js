import { createApp } from "vue";
import App from "./App.vue";
import "./css/style.scss";
import "./utils/extend";
import router from "./router";

const app = createApp(App);
app.use(router);

const global = app.config.globalProperties;

global.$sleep = (msec = 300) => {
  return new Promise((resolve) => {
    setTimeout(resolve, msec);
  });
};

app.mount("#app");
