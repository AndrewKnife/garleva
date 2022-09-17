import { RouteRecordRaw, createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { routes } from '@/shared/constants/routes';

const routeConfig: Array<RouteRecordRaw> = [
  {
    ...routes.login,
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/LoginPage.vue'),
  },
  {
    ...routes.main,
    component: () => import(/* webpackChunkName: "main" */ '@/pages/main/MainPage.vue'),
  },
];

export const router = createRouter({
  history: process.env.VUE_APP_ENABLE_HASH_ROUTER
    ? createWebHashHistory(process.env.BASE_URL)
    : createWebHistory(process.env.BASE_URL),
  routes: routeConfig,
  scrollBehavior: (to, from, scroll) => (from.path === to.path ? { top: scroll?.top } : { top: 0 }),
});
