import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Redirect from '../views/Redirect.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:shortURL',
    name: 'redirect',
    component : Redirect
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
