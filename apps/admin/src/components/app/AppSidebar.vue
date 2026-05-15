<template>
  <aside class="admin-shell-card flex h-[calc(100vh-32px)] flex-col overflow-hidden">
    <div class="border-b border-[var(--admin-border)] px-4 py-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--admin-primary-soft)] text-lg font-semibold text-[var(--admin-primary)]">
          TM
        </div>
        <div v-if="!collapsed" class="min-w-0">
          <div class="truncate text-sm font-semibold text-[var(--admin-text-strong)]">{{ t('common.appName') }}</div>
          <div class="admin-muted text-xs">Operations Console</div>
        </div>
      </div>
    </div>
    <div v-if="!collapsed" class="px-4 pt-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--admin-text-faint)]">
      Navigation
    </div>
    <div class="admin-sidebar-nav flex-1 overflow-y-auto px-2 pb-3 pt-2">
      <tm-menu
        mode="inline"
        :inline-collapsed="collapsed"
        :selected-keys="[selectedKey]"
        :open-keys="collapsed ? [] : openKeys"
        :items="menuItems"
        @click="handleClick"
        @openChange="handleOpenChange"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, h, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { ItemType, MenuProps } from 'ant-design-vue'
import {
  AppstoreOutlined,
  BookOutlined,
  DatabaseOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  MenuOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'
import { usePermissionStore } from '@admin/stores/permission'

const { collapsed } = defineProps<{ collapsed: boolean }>()

const iconMap = {
  DashboardOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  TeamOutlined,
  SafetyOutlined,
  MenuOutlined,
  BookOutlined,
  FileSearchOutlined,
  FileDoneOutlined,
  SettingOutlined,
}

const route = useRoute()
const router = useRouter()
const permissionStore = usePermissionStore()
const { t } = useI18n()
const openKeys = ref<string[]>([])

const sidebarRoutes = computed(() =>
  permissionStore.accessibleRoutes
    .find((item) => item.path === '/')?.children
    ?.filter((item) => !item.meta?.hidden) ?? [],
)

const selectedKey = computed(() => route.meta.activeMenu ?? route.path)

function resolvePath(parentPath: string, currentPath: string) {
  if (currentPath.startsWith('/')) {
    return currentPath
  }

  return `${parentPath}/${currentPath}`.replace(/\/+/g, '/')
}

const menuItems = computed<ItemType[]>(() => {
  const toItem = (item: any, parentPath = ''): ItemType => {
    const fullPath = resolvePath(parentPath, item.path)

    return {
      key: fullPath,
      icon: item.meta?.icon ? h(iconMap[item.meta.icon as keyof typeof iconMap]) : undefined,
      label: t(String(item.meta?.title ?? item.name)),
      children: item.children
        ?.filter((child: any) => !child.meta?.hidden)
        .map((child: any) => toItem(child, fullPath)),
    }
  }

  return sidebarRoutes.value.map((item) => toItem(item))
})

watch(
  () => route.matched,
  (matched) => {
    openKeys.value = matched.map((item) => item.path).filter((item) => item && item !== route.path)
  },
  { immediate: true },
)

function handleClick(event: MenuProps['onClick'] extends (...args: infer P) => any ? P[0] : { key: string }) {
  router.push(String(event.key))
}

function handleOpenChange(keys: string[]) {
  openKeys.value = keys
}
</script>

<style scoped>
.admin-sidebar-nav :deep(.ant-menu) {
  background: transparent;
  border-inline-end: 0;
}

.admin-sidebar-nav :deep(.ant-menu-item),
.admin-sidebar-nav :deep(.ant-menu-submenu-title) {
  width: auto;
  height: 36px;
  margin: 4px 6px;
  border-radius: 8px;
  color: var(--admin-text-soft);
  font-size: 13px;
  font-weight: 500;
}

.admin-sidebar-nav :deep(.ant-menu-submenu-selected > .ant-menu-submenu-title),
.admin-sidebar-nav :deep(.ant-menu-item-selected) {
  background: var(--admin-primary-soft);
  color: var(--admin-primary) !important;
  font-weight: 700;
}

.admin-sidebar-nav :deep(.ant-menu-item:hover),
.admin-sidebar-nav :deep(.ant-menu-submenu-title:hover) {
  color: var(--admin-primary);
}

.admin-sidebar-nav :deep(.ant-menu-inline-collapsed .ant-menu-item),
.admin-sidebar-nav :deep(.ant-menu-inline-collapsed .ant-menu-submenu-title) {
  padding-inline: calc(50% - 18px) !important;
}
</style>
