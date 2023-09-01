import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterView,
} from 'vue-router'
import BaseLayout from '@/layouts/Base.vue'

declare module 'vue-router' {
  interface RouteMeta {
    hasDrawer?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/projects/index/Page.vue'),
        children: [
          {
            path: '',
            name: 'projects',
            component: () => import('@/pages/projects/index/Loader.vue'),
          },
        ],
      },
      {
        path: '/projects/:id',
        components: {
          default: () => import('@/pages/projects/show/Page.vue'),
          navigation: () =>
            import('@/components/navigations/TheProjectNavigation.vue'),
        },
        meta: {
          hasDrawer: true,
        },
        children: [
          {
            path: '',
            name: 'project',
            component: () => import('@/pages/projects/show/Content.vue'),
          },
          {
            path: 'website',
            components: {
              default: RouterView,
              navigation: () =>
                import('@/components/navigations/TheWebsiteNavigation.vue'),
            },
            children: [
              {
                path: '',
                name: 'project-website',
                component: () => import('@/pages/projects/Website.vue'),
              },
            ],
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
