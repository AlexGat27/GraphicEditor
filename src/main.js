import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia(); // Создайте экземпляр Pinia

app.use(pinia); // Подключите Pinia к приложению
app.mount('#app');