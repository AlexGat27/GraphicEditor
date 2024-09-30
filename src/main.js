import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import App from './App.vue'
import router from './router'
import ModelService from "@/services/model-service.js";
import ScenarioService from "@/services/scenario-service.js";

const app = createApp(App);
const pinia = createPinia(); // Создайте экземпляр Pinia

app.use(pinia); // Подключите Pinia к приложению
app.use(router);
app.use(VueReCaptcha, {
    siteKey: '6LcjPgYqAAAAACr4ePwNSFNq-GKm-9xHl9ccqd-k', // замените YOUR_SITE_KEY на ваш ключ сайта
  });

app.config.globalProperties.$modelService = ModelService;
app.config.globalProperties.$scenarioService = ScenarioService;

app.mount('#app');


