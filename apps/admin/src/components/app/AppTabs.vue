<template>
  <div class="admin-shell-card admin-tabbar flex items-center gap-3 px-3 py-2">
    <div class="min-w-0 flex-1">
      <tm-tabs
        hide-add
        type="editable-card"
        size="small"
        :active-key="route.fullPath"
        :items="tabItems"
        @change="handleChange"
        @edit="handleEdit"
      />
    </div>
    <div class="flex items-center gap-2">
      <tm-button size="small" @click="refreshCurrent">
        {{ t('common.refresh') }}
      </tm-button>
      <tm-button size="small" @click="closeOthers">
        {{ t('common.closeOtherTabs') }}
      </tm-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTabsStore } from '@admin/stores/tabs'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const tabsStore = useTabsStore()

const tabItems = computed(() =>
  tabsStore.tabs.map((item) => ({
    key: item.fullPath,
    label: t(item.title),
    closable: item.closable,
  })),
)

function handleChange(key: string) {
  router.push(key)
}

function handleEdit(targetKey: string | MouseEvent | KeyboardEvent, action: 'add' | 'remove') {
  if (action !== 'remove') {
    return
  }

  const key = String(targetKey)
  const currentIndex = tabsStore.tabs.findIndex((item) => item.fullPath === key)
  tabsStore.removeTab(key)
  if (route.fullPath === key) {
    const fallback = tabsStore.tabs[Math.max(0, currentIndex - 1)] ?? tabsStore.tabs[0]
    if (fallback) {
      router.push(fallback.fullPath)
    }
  }
}

function closeOthers() {
  tabsStore.keepOnly(route.fullPath)
}

function refreshCurrent() {
  window.location.reload()
}
</script>

<style scoped>
.admin-tabbar :deep(.ant-tabs-nav) {
  margin: 0;
}

.admin-tabbar :deep(.ant-tabs-card.ant-tabs-small > .ant-tabs-nav .ant-tabs-tab) {
  border-color: var(--admin-border);
  border-radius: 8px 8px 0 0;
  background: var(--admin-surface-secondary);
  font-size: 12px;
}

.admin-tabbar :deep(.ant-tabs-card.ant-tabs-small > .ant-tabs-nav .ant-tabs-tab-active) {
  border-bottom-color: var(--admin-surface);
  background: var(--admin-surface);
}

.admin-tabbar :deep(.ant-tabs-content-holder) {
  display: none;
}

.admin-tabbar :deep(.ant-tabs-nav::before) {
  border-bottom-color: var(--admin-border);
}
</style>
