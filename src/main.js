import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import "./assets/tailwind.css";

const app = createApp(App);

app.mount("#app");

window.onload = () => {
  document.body.classList.remove("preload");
};