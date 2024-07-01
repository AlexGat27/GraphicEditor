import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia(); // Создайте экземпляр Pinia

app.use(pinia); // Подключите Pinia к приложению
app.use(router)
app.mount('#app');