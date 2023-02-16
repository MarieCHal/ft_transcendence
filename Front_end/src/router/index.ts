import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import SigneInView from '../views/SigneInView.vue'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SigneInView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
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
