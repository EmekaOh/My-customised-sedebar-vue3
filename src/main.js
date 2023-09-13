import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FontAwesomeIcon from "./components/fontawesome";

import "./assets/CSS/tailwind.css";

createApp(App)
	.use(store)
	.use(router)
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount("#app");
