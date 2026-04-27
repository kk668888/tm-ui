<template>
  <section class="admin-page-section">
    <div class="admin-toolbar">
      <div>
        <h1 class="mb-2 text-3xl font-semibold">{{ t('menu.dashboard') }}</h1>
        <p class="admin-muted mb-0">
          一个面向多个项目复用的后台模板，路由、权限、mock、国际化和主题能力都在这里起步。
        </p>
      </div>
      <tm-space>
        <tm-button type="primary" @click="appStore.searchOpen = true">{{ t('common.search') }}</tm-button>
        <tm-button @click="appStore.toggleTheme()">{{ t('common.theme') }}</tm-button>
      </tm-space>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div v-for="card in statCards" :key="card.label" class="admin-stat-card">
        <div class="admin-muted mb-3 text-sm">{{ card.label }}</div>
        <div class="mb-2 text-3xl font-semibold">{{ card.value }}</div>
        <div class="text-sm text-[var(--admin-primary)]">{{ card.note }}</div>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <tm-card>
        <template #title>当前模板能力</template>
        <div class="grid gap-3 md:grid-cols-2">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl border border-slate-200/60 p-4">
            <div class="mb-2 font-semibold">{{ feature.title }}</div>
            <div class="admin-muted text-sm leading-6">{{ feature.desc }}</div>
          </div>
        </div>
      </tm-card>

      <tm-card>
        <template #title>当前登录信息</template>
        <tm-descriptions bordered :column="1" size="small">
          <a-descriptions-item label="User">{{ authStore.profile?.username }}</a-descriptions-item>
          <a-descriptions-item label="Roles">{{ authStore.profile?.roleCodes.join(', ') }}</a-descriptions-item>
          <a-descriptions-item label="Permissions">{{ authStore.permissions.length }}</a-descriptions-item>
          <a-descriptions-item label="Theme">{{ appStore.theme }}</a-descriptions-item>
          <a-descriptions-item label="Locale">{{ appStore.locale }}</a-descriptions-item>
        </tm-descriptions>
      </tm-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@admin/stores/app'
import { useAuthStore } from '@admin/stores/auth'

const { t } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()

const statCards = computed(() => [
  { label: 'Core Modules', value: '6+', note: 'Users / Roles / Menus / Dicts / Logs / Configs' },
  { label: 'Auth Model', value: 'Static RBAC', note: 'route guard + button permissions' },
  { label: 'Mock Coverage', value: 'CRUD Ready', note: 'mock API schema prepared for real backend' },
  { label: 'Theme + I18n', value: '2 x 2', note: 'default / ocean + zh / en' },
])

const features = [
  { title: 'Static routes with permission filtering', desc: '所有页面走静态路由，但菜单显示、页面访问和按钮操作都受权限码控制。' },
  { title: 'Pinia as the backbone', desc: '用户态、权限态、全局设置和标签页统一归档，后续业务模块只接入 store。' },
  { title: 'Mock-first delivery', desc: '先把前台闭环和接口结构定下来，后端接入时直接替换 API 层，不推翻页面逻辑。' },
  { title: 'tm-ui in real admin pages', desc: '优先使用当前组件库构建查询表单、操作按钮和卡片布局，验证后台场景的可复用性。' },
]
</script>
