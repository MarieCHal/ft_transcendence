import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import PlayView from '../views/PlayView.vue'
import ChanView from '../views/ChatView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/Users',
      name: 'users',
      component: UsersView,
      beforeEnter:(to, from, next) => {
        console.log(localStorage.getItem('accessToken'));
        if(localStorage.getItem('accessToken')){
          next();
        }
        else {
          next({ name: 'login' });
        }
      }
    },
    {
      path: '/Play',
      name: 'play',
      component: PlayView,
      beforeEnter:(to, from, next) => {
        console.log(localStorage.getItem('accessToken'));
        if(localStorage.getItem('accessToken')){
          next();
        }
        else {
          next({ name: 'login' });
        }
      }
    },
    {
      path: '/Chat',
      name: 'chat',
      component: ChanView,
      beforeEnter:(to, from, next) => {
        console.log(localStorage.getItem('accessToken'));
        if(localStorage.getItem('accessToken')){
          next();
        }
        else {
          next({ name: 'login' });
        }
      }
    },
    {
      path: '/Profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter:(to, from, next) => {
        console.log(localStorage.getItem('accessToken'));
        if(localStorage.getItem('accessToken')){
          next();
        }
        else {
          next({ name: 'login' });
        }
      }
    }
  ]
})
export default router
