<template>
  <aside class="admin-shell-card flex h-[calc(100vh-32px)] flex-col overflow-hidden rounded-[28px]">
    <div class="flex items-center gap-3 px-5 py-5">
      <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-xl font-semibold text-[var(--admin-primary)]">
        T
      </div>
      <div v-if="!collapsed">
        <div class="text-base font-semibold">{{ t('common.appName') }}</div>
        <div class="admin-muted text-xs">tm-ui admin starter</div>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto px-3 pb-4">
      <a-menu
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
