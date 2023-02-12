// Vue Router tutorial: https://vueschool.io/lessons/installing-and-setting-up-vue-router-with-vite-vite-only
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home.vue'),
  },
]

export default createRouter({
  // Remove hash (#) from url, as opposed to createWebHashHistory which uses hash
  history: createWebHistory(),
  routes,
})
