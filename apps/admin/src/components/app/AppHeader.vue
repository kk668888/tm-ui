<template>
  <header class="admin-shell-card flex flex-col gap-4 rounded-[28px] px-5 py-4">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <tm-button type="text" @click="appStore.toggleSidebar()">
          <component :is="appStore.sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </tm-button>
        <AppBreadcrumbs />
      </div>
      <tm-space>
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
        <a-dropdown>
          <a class="flex items-center gap-3 text-[var(--admin-text)]" @click.prevent>
            <tm-avatar :src="authStore.profile?.avatar" />
            <div class="hidden text-left md:block">
              <div class="text-sm font-semibold">{{ authStore.profile?.nickname }}</div>
              <div class="admin-muted text-xs">{{ authStore.profile?.roleCodes.join(', ') }}</div>
            </div>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="logout">{{ t('common.logout') }}</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </tm-space>
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
</script>
