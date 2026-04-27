import type { App, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@admin/stores/permission'

function applyPermission(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
  const permissionStore = usePermissionStore()
  const allowed = permissionStore.hasPermission(binding.value)
  if (!allowed) {
    el.style.display = 'none'
  }
}

export function registerPermissionDirective(app: App) {
  app.directive('permission', {
    mounted(el, binding) {
      applyPermission(el as HTMLElement, binding)
    },
    updated(el, binding) {
      applyPermission(el as HTMLElement, binding)
    },
  })
}
