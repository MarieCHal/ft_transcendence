import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/main.scss'
import config from '@/config.js';

axios.defaults.baseURL = config.BASE_URL;

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
