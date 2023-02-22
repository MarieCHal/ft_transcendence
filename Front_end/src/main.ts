import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import './assets/main.scss'

const store = createStore({
    state: {
        isAuthenticated: false,
        isAvatar: "https://cdn.intra.42.fr/users/84f1c5532575fc3091b49dcba4f5f8ff/small_jschreye.jpg",
        isLogin: ""
      },
      mutations: {
        setAuthenticated(state, isAuthenticated) {
          state.isAuthenticated = isAuthenticated
        },
        setAvatar(state, isAvatar) {
          state.isAvatar = isAvatar
        },
        setLogin(state, isLogin) {
          state.isLogin = isLogin
        }
      },
      getters: {
        getAuthenticated: state => state.isAuthenticated,
        getAvatar: state => state.isAvatar,
        getLogin: state => state.isLogin
      }    
});
const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
