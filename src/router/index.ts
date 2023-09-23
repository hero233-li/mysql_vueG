import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/catch'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/map-menu'
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
      name: '/GMain',
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

  if (to.path !== '/GLogin' && !token) {
    return '/GLogin'
  }
  if (to.path === '/GMain') {
    return firstMenu.menu_router
  }
})
export default router
