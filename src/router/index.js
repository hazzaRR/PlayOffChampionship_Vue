import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import CreateLeague from '../views/league/CreateLeague.vue';
import League from '../views/league/League.vue';
import NotFound from '../views/NotFound.vue';
import Login from '../views/auth/Login.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: { 
      requiresAuth: false,
    }
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login,
    meta: { 
      requiresAuth: false,
    }
  },
  {
    path: '/league/create',
    name: 'createLeague',
    component: CreateLeague,
    meta: { 
      requiresAuth: false,
    }
  },
  {
    path: '/league/',
    name: 'Leagues',
    component: League,
    meta: { 
      requiresAuth: false,
    }
  },
  { 
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound,
  meta: { 
      requiresAuth: false,
    }
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router