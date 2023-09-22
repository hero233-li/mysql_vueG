import { createRouter, createWebHashHistory } from 'vue-router'
import path from 'path'
import { localCache } from '@/utils/catch'
import { LOGIN_TOKEN } from '@/global/constants'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/GMain'
    },
    {
      path: '/GLogin',
      component: () => import('@/views/Login/G-login.vue')
    },
    {
      path: '/GMain',
      component: () => import('@/views/main/G-main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/Not-found/G-NotFound.vue')
    }
  ]
})
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)

  if (to.path === '/GMain' && !token) {
    return '/GLogin'
  }
})
export default router
