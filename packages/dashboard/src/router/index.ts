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
            name: 'project',
            component: () => import('@/pages/projects/Show.vue'),
          },
          {
            path: 'mint-rules',
            name: 'project-mint-rules',
            component: () => import('@/pages/projects/MintRules.vue'),
          },
          {
            path: 'whitelist',
            name: 'project-whitelist',
            component: () => import('@/pages/projects/Whitelist.vue'),
          },
          {
            path: 'settings',
            name: 'project-settings',
            component: () => import('@/pages/projects/Settings.vue'),
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
