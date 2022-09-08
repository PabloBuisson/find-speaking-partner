import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// import shared CSS
import "./assets/main.css";
// import shared components
import BaseBadge from "./components/common/BaseBadge.vue";
import BaseButton from "./components/common/BaseButton.vue";
import BaseCard from "./components/common/BaseCard.vue";
import BaseDialog from "./components/common/BaseDialog.vue";
import BaseSpinner from "./components/common/BaseSpinner.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);
app.component("BaseBadge", BaseBadge);
app.component("BaseSpinner", BaseSpinner);
app.component("BaseDialog", BaseDialog);

app.mount("#app");
