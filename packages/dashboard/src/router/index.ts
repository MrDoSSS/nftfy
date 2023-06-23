import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BaseLayout from '@/layouts/Base.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'projects',
        component: () => import('@/pages/projects/Index.vue'),
      },
      {
        path: '/projects/:id',
        component: () => import('@/layouts/Project.vue'),
        meta: {
          hasDrawer: true,
        },
        children: [
          {
            path: '',
            component: () => import('@/layouts/ProjectLoader.vue'),
            children: [
              {
                path: '',
                name: 'project',
                component: () => import('@/pages/projects/Show.vue'),
              },
              {
                path: 'website',
                name: 'project-website',
                component: () => import('@/pages/projects/Website.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
})
