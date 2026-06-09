import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home', // 默认重定向到首页
      children: [
        {
          path: 'home',
          name: 'Home',
          component: HomeView,
          redirect: '/home/js-view',
          meta: {
            isTopMenu: true,
            showInMenu: true,
            title: '首页',
            order: 1,
          },
          children: [
            {
              path: 'js-view',
              name: 'JsView',
              component: () => import('../views/JsView.vue'),
              meta: {
                showInMenu: true,
                title: 'JavaScript',
                order: 1,
              },
            },
          ],
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('../views/AboutView.vue'),
          meta: {
            isTopMenu: true,
            showInMenu: true,
            title: '关于',
            order: 2,
          },
        },
        {
          path: 'function-demo',
          name: 'FunctionDemo',
          component: () => import('../views/FunctionDemo.vue'),
          redirect: '/function-demo/canvas',
          meta: {
            isTopMenu: true,
            showInMenu: true,
            title: '功能演示',
            order: 3,
          },
          children: [
            {
              path: 'canvas',
              name: 'Canvas',
              component: () => import('../views/CanvasView.vue'),
              meta: {
                showInMenu: true,
                title: 'Canvas',
                order: 1,
              },
            },
            {
              path: 'echarts',
              name: 'Echarts',
              component: () => import('../views/EchartsView.vue'),
              meta: {
                showInMenu: true,
                title: '图表(Echarts)',
                order: 2,
              },
            },
            {
              path: 'pinia-demo1',
              name: 'PiniaDemo1',
              component: () => import('../views/PiniaDemo1.vue'),
              meta: {
                showInMenu: true,
                title: 'Pinia演示1',
                order: 3,
              },
            },
            {
              path: 'pinia-demo2',
              name: 'PiniaDemo2',
              component: () => import('../views/PiniaDemo2.vue'),
              meta: {
                showInMenu: true,
                title: 'Pinia演示2',
                order: 4,
              },
            },
          ],
        },
      ],
    },
  ],
})

export default router
