<template>
  <div class="admin-shell-card flex items-center gap-3 rounded-[24px] px-4 py-3">
    <div class="min-w-0 flex-1">
      <a-tabs
        hide-add
        type="editable-card"
        size="small"
        :active-key="route.fullPath"
        :items="tabItems"
        @change="handleChange"
        @edit="handleEdit"
      />
    </div>
    <tm-space>
      <tm-button size="small" @click="refreshCurrent">
        {{ t('common.refresh') }}
      </tm-button>
      <tm-button size="small" @click="closeOthers">
        {{ t('common.closeOtherTabs') }}
      </tm-button>
    </tm-space>
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
