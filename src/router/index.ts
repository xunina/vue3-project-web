import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        showInMenu: true, 
        title: '首页',
        order: 1
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        showInMenu: true,
        title: '关于',
        order: 2
      }
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: () => import('../views/EchartsView.vue'),
      meta: {
        showInMenu: true,
        title: '图表',
        order: 3
      }
    },
  ],
})

export default router
