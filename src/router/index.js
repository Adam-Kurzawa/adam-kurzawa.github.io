import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReaderView from '@/views/ReaderView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:lang/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:lang/:title/:chapter?',
      name: 'reader',
      component: ReaderView
    }
  ]
})

export default router
