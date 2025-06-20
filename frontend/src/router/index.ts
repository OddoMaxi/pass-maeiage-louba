import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('../pages/Home.vue') },
  { path: '/payments', name: 'Payments', component: () => import('../pages/Payments.vue') },
  { path: '/how-to-apply', name: 'HowToApply', component: () => import('../pages/HowToApply.vue') },
  { path: '/faq', name: 'FAQ', component: () => import('../pages/FAQ.vue') },
  { path: '/support', name: 'Support', component: () => import('../pages/Support.vue') },
  { path: '/moderator', name: 'Moderator', component: () => import('../pages/Moderator.vue') },
  { path: '/login', name: 'Login', component: () => import('../pages/Login.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
