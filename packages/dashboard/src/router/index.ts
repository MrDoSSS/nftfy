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
        components: {
          default: () => import('@/layouts/Project.vue'),
          navigation: () => import('@/components/navigations/Project.vue'),
        },
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
              {
                path: 'phases',
                name: 'project-phases',
                component: () => import('@/pages/projects/Phases.vue'),
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
