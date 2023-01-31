import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import SigneInView from '../views/SigneInView.vue'
import FirstView from '../views/FirstView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'first',
      component: FirstView
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signe_in',
      name: 'signe_in',
      component: SigneInView
    }
  ]
})
export default router
