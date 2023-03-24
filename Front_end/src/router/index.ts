import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import PlayView from '../views/PlayView.vue'
import ChanView from '../views/ChatView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProfileUserView from '../views/ProfileUserView.vue'
import ProfileModifView from '../views/ProfileModifView.vue'
import LoginView from '../views/LoginView.vue'
import DashBoardChan from '../views/DashBoardChatView.vue'
import CodeChatView from '../views/CodeChatView.vue'
import CreateChan from '../views/CreateChanView.vue'
import store  from '../store';
    
function isAuthenticated(){
  let isConnect = store.getters.getAuthenticated;
  if (isConnect == true)
    return true;
  else
    return false;
}

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
      component: LoginView
    },
    {
      path: '/Users',
      name: 'users',
      component: UsersView
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/Play',
      name: 'play',
      component: PlayView,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/CreateChan',
      name: 'CreateChan',
      component: CreateChan,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/codeChat',
      name: 'codeChat',
      component: CodeChatView,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/dashBoardChan',
      name: 'dashBoardChan',
      component: DashBoardChan,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/Chat',
      name: 'chat',
      component: ChanView,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/Profile',
      name: 'profile',
      component: ProfileView,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/ProfileUser',
      name: 'profileuser',
      component: ProfileUserView,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    },
    {
      path: '/Profile/modif',
      name: 'profileModif',
      component: ProfileModifView,
      /*beforeEnter:(to, from, next) => {
        console.log(isAuthenticated());
        if(isAuthenticated() == true){
          next();
        }
        else {
          next({ name: 'register' });
        }
      }*/
    }
  ]
})
export default router