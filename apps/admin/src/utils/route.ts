import type { RouteRecordRaw } from 'vue-router'

export function hasPermission(permission: string | string[] | undefined, permissions: string[]) {
  if (!permission) {
    return true
  }

  const list = Array.isArray(permission) ? permission : [permission]
  return list.every((item) => permissions.includes(item))
}

export function filterRoutesByPermission(routes: RouteRecordRaw[], permissions: string[]) {
  return (
    routes
    .filter((route) => hasPermission(route.meta?.permission, permissions))
    .map((route) => ({
      ...route,
      children: route.children ? filterRoutesByPermission(route.children, permissions) : undefined,
    }))
    .filter((route) => !route.meta?.hidden || (route.children && route.children.length > 0) || !route.redirect)
  ) as RouteRecordRaw[]
}

export function flattenMenuRoutes(routes: RouteRecordRaw[], parentPath = ''): RouteRecordRaw[] {
  return routes.flatMap((route) => {
    const currentPath = route.path.startsWith('/') ? route.path : `${parentPath}/${route.path}`.replace(/\/+/g, '/')
    const nextRoute = { ...route, path: currentPath }
    const children = route.children ? flattenMenuRoutes(route.children, currentPath) : []
    return [nextRoute, ...children]
  }) as RouteRecordRaw[]
}
