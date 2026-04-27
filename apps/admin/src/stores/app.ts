import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { APP_THEMES, DEFAULT_LOCALE, DEFAULT_THEME, STORAGE_KEYS } from '@admin/config'
import { storage } from '@admin/utils/storage'
import type { AppTheme } from '@admin/config'
import type { Language } from '@admin/types'

export const useAppStore = defineStore('app', () => {
  const theme = ref<AppTheme>(storage.get<AppTheme>(STORAGE_KEYS.theme, DEFAULT_THEME))
  const locale = ref<Language>(storage.get<Language>(STORAGE_KEYS.locale, DEFAULT_LOCALE))
  const searchOpen = ref(false)
  const sidebarCollapsed = ref(false)

  const themeOptions = computed(() => APP_THEMES)

  watch(theme, (value) => {
    storage.set(STORAGE_KEYS.theme, value)
    document.documentElement.dataset.theme = value
  }, { immediate: true })

  watch(locale, (value) => {
    storage.set(STORAGE_KEYS.locale, value)
    document.documentElement.lang = value
  }, { immediate: true })

  function toggleTheme(nextTheme?: AppTheme) {
    theme.value = nextTheme ?? (theme.value === 'default' ? 'ocean' : 'default')
  }

  function toggleLocale() {
    locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return {
    theme,
    locale,
    searchOpen,
    sidebarCollapsed,
    themeOptions,
    toggleTheme,
    toggleLocale,
    toggleSidebar,
  }
})
