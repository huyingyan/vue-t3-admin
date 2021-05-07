import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layer from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layer,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          inMenu: true,
          title: '首页',
        },
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/article/index.vue'),
        meta: {
          inMenu: true,
          title: '文章',
          hasChildrenInMenu: true,
        },
        children: [
          {
            path: 'list',
            name: 'List',
            component: () => import('@/views/article/list.vue'),
            meta: {
              title: '列表',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
