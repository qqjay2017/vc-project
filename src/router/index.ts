import { createRouter, createWebHashHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      children: [
        { path: '', component: Dashboard },
        { path: 'system/users', component: () => import('@/views/Placeholder.vue') },
        { path: 'system/roles', component: () => import('@/views/Placeholder.vue') },
        { path: 'system/menus', component: () => import('@/views/Placeholder.vue') },
        { path: 'content/articles', component: () => import('@/views/Placeholder.vue') },
        { path: 'content/categories', component: () => import('@/views/Placeholder.vue') },
        { path: 'statistics', component: () => import('@/views/Placeholder.vue') },
        { path: 'settings', component: () => import('@/views/Placeholder.vue') },
      ],
    },
  ],
})

export default router
