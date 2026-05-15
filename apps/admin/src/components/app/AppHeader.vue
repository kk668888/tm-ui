<template>
  <header class="admin-shell-card flex flex-col gap-3 px-4 py-3">
    <div class="flex items-center justify-between gap-4">
      <div class="flex min-w-0 items-center gap-3">
        <tm-button type="text" size="small" @click="appStore.toggleSidebar()">
          <component :is="appStore.sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </tm-button>
        <div class="min-w-0">
          <AppBreadcrumbs />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <tm-button @click="appStore.searchOpen = true">
          <SearchOutlined />
          {{ t('common.search') }}
        </tm-button>
        <tm-segmented
          :model-value="appStore.theme"
          :options="themeOptions"
          size="small"
          @update:model-value="handleThemeChange"
        />
        <tm-button @click="toggleLanguage">
          <GlobalOutlined />
          {{ localeLabel }}
        </tm-button>
        <tm-dropdown :items="userMenuItems" @select="handleUserMenuSelect">
          <a class="flex items-center gap-3 rounded-[10px] border border-[var(--admin-border)] px-3 py-2 text-[var(--admin-text)] transition hover:border-[var(--admin-primary-soft-strong)]" @click.prevent>
            <tm-avatar :src="authStore.profile?.avatar" />
            <div class="hidden text-left md:block">
              <div class="text-sm font-semibold">{{ authStore.profile?.nickname }}</div>
              <div class="admin-muted text-xs">{{ authStore.profile?.roleCodes.join(', ') }}</div>
            </div>
          </a>
        </tm-dropdown>
      </div>
    </div>
    <AppGlobalSearch />
  </header>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { GlobalOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@admin/stores/app'
import { useAuthStore } from '@admin/stores/auth'
import AppBreadcrumbs from './AppBreadcrumbs.vue'
import AppGlobalSearch from './AppGlobalSearch.vue'

const appStore = useAppStore()
const authStore = useAuthStore()
const router = useRouter()
const { t, locale } = useI18n()

watch(
  () => appStore.locale,
  (value) => {
    locale.value = value
  },
  { immediate: true },
)

const localeLabel = computed(() => appStore.locale === 'zh-CN' ? 'EN' : '中文')
const themeOptions = computed(() =>
  appStore.themeOptions.map((item) => ({ label: item.label, value: item.value })),
)
const userMenuItems = computed(() => [{ key: 'logout', label: t('common.logout') }])

function handleThemeChange(value: string | number) {
  appStore.toggleTheme(String(value) as 'default' | 'ocean')
}

function toggleLanguage() {
  appStore.toggleLocale()
}

async function logout() {
  await authStore.logout()
  router.replace('/login')
}

function handleUserMenuSelect(item: { key: string }) {
  if (item.key === 'logout') {
    logout()
  }
}
</script>
