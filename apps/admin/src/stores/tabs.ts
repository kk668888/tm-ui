import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { STORAGE_KEYS } from '@admin/config'
import { storage } from '@admin/utils/storage'

export interface TabItem {
  fullPath: string
  path: string
  name: string
  title: string
  closable: boolean
  keepAlive: boolean
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>(storage.get<TabItem[]>(STORAGE_KEYS.tabs, []))

  const cachedViewNames = computed(() =>
    tabs.value.filter((item) => item.keepAlive).map((item) => item.name),
  )

  function persist() {
    storage.set(STORAGE_KEYS.tabs, tabs.value)
  }

  function ensureAffixTab(tab: TabItem) {
    if (!tabs.value.some((item) => item.fullPath === tab.fullPath)) {
      tabs.value.unshift(tab)
      persist()
    }
  }

  function addTab(tab: TabItem) {
    if (tabs.value.some((item) => item.fullPath === tab.fullPath)) {
      return
    }
    tabs.value.push(tab)
    persist()
  }

  function removeTab(fullPath: string) {
    tabs.value = tabs.value.filter((item) => item.fullPath !== fullPath || !item.closable)
    persist()
  }

  function keepOnly(fullPath: string) {
    tabs.value = tabs.value.filter((item) => !item.closable || item.fullPath === fullPath)
    persist()
  }

  function resetTabs() {
    tabs.value = tabs.value.filter((item) => !item.closable)
    persist()
  }

  return {
    tabs,
    cachedViewNames,
    addTab,
    ensureAffixTab,
    removeTab,
    keepOnly,
    resetTabs,
  }
})
