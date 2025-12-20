import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ReaderView from '@/views/ReaderView.vue'
import AboutView from '@/views/AboutView.vue'
import BlogView from '@/views/BlogView.vue'
import BooksView from '@/views/BooksView.vue'
import StoriesView from '@/views/StoriesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/stories',
      name: 'stories',
      component: StoriesView
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/:title/:chapter?',
      name: 'reader',
      component: ReaderView
    },
    { path: '/:pathMatch(.*)*', 
      name: 'not-found', 
      component: NotFoundView 
    }
  ]
})

export default router
