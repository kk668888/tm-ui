import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'
import { useAuthStore } from '@admin/stores/auth'
import { usePermissionStore } from '@admin/stores/permission'
import { useTabsStore } from '@admin/stores/tabs'

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const permissionStore = usePermissionStore()

  await authStore.bootstrap()
  permissionStore.buildRoutes()

  if (to.meta.public) {
    if (to.path === '/login' && authStore.isLoggedIn) {
      return '/'
    }
    return true
  }

  if (!authStore.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.permission && !permissionStore.hasPermission(to.meta.permission)) {
    return '/403'
  }

  return true
})

router.afterEach((to) => {
  if (to.meta.public || !to.name) {
    return
  }

  const tabsStore = useTabsStore()
  const title = String(to.meta.title ?? to.name)
  const tab = {
    fullPath: to.fullPath,
    path: to.path,
    name: String(to.name),
    title,
    closable: !to.meta.affix,
    keepAlive: Boolean(to.meta.keepAlive),
  }

  if (to.meta.affix) {
    tabsStore.ensureAffixTab(tab)
  } else {
    tabsStore.addTab(tab)
  }
})
