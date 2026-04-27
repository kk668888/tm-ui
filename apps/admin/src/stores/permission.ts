import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { filterRoutesByPermission, flattenMenuRoutes } from '@admin/utils/route'
import { constantRoutes } from '@admin/router/routes'
import { useAuthStore } from '@admin/stores/auth'

export const usePermissionStore = defineStore('permission', () => {
  const accessibleRoutes = ref<RouteRecordRaw[]>([])

  const menuRoutes = computed(() => flattenMenuRoutes(accessibleRoutes.value as RouteRecordRaw[]))

  function buildRoutes() {
    const authStore = useAuthStore()
    accessibleRoutes.value = filterRoutesByPermission(
      constantRoutes as RouteRecordRaw[],
      authStore.permissions,
    )
  }

  function hasPermission(permission?: string | string[]) {
    const authStore = useAuthStore()
    if (!permission) {
      return true
    }

    const list = Array.isArray(permission) ? permission : [permission]
    return list.every((item) => authStore.permissions.includes(item))
  }

  return {
    accessibleRoutes,
    menuRoutes,
    buildRoutes,
    hasPermission,
  }
})
