import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/main.scss'

axios.defaults.baseURL = 'http://c1r2s3:4000';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
