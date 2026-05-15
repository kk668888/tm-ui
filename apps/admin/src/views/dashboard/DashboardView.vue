<template>
  <section class="admin-page">
    <AdminPageHeader title="运营概览" description="查看当前后台的权限、模块接入、配置状态和近期运行关注点。">
      <template #actions>
        <tm-button @click="appStore.searchOpen = true">{{ t('common.search') }}</tm-button>
        <tm-button type="primary" @click="appStore.toggleTheme()">{{ t('common.theme') }}</tm-button>
      </template>
    </AdminPageHeader>

    <div class="admin-page-grid md:grid-cols-2 2xl:grid-cols-4">
      <section v-for="card in statCards" :key="card.label" class="admin-panel admin-stat-card">
        <div class="admin-stat-card-label">{{ card.label }}</div>
        <div class="admin-stat-card-value">{{ card.value }}</div>
        <div class="admin-stat-card-note">{{ card.note }}</div>
      </section>
    </div>

    <div class="admin-page-grid xl:grid-cols-[1.2fr_0.8fr]">
      <AdminTablePanel title="待处理事项" description="建议优先处理的后台维护动作。">
        <tm-table class="admin-data-table" :data-source="todoItems" :columns="todoColumns" :pagination="false" row-key="title" />
      </AdminTablePanel>

      <AdminInfoCard title="当前登录上下文" description="当前会话的账号身份和工作台环境。">
        <tm-descriptions bordered :column="1" size="small">
          <tm-descriptions-item label="账号">{{ authStore.profile?.username }}</tm-descriptions-item>
          <tm-descriptions-item label="角色">{{ authStore.profile?.roleCodes.join(', ') }}</tm-descriptions-item>
          <tm-descriptions-item label="权限数">{{ authStore.permissions.length }}</tm-descriptions-item>
          <tm-descriptions-item label="主题">{{ appStore.theme }}</tm-descriptions-item>
          <tm-descriptions-item label="语言">{{ appStore.locale }}</tm-descriptions-item>
        </tm-descriptions>
      </AdminInfoCard>
    </div>

    <div class="admin-page-grid xl:grid-cols-3">
      <AdminInfoCard v-for="feature in features" :key="feature.title" :title="feature.title" :description="feature.desc">
        <div class="admin-pill">{{ feature.tag }}</div>
      </AdminInfoCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@admin/stores/app'
import { useAuthStore } from '@admin/stores/auth'
import AdminInfoCard from '@admin/components/app/AdminInfoCard.vue'
import AdminPageHeader from '@admin/components/app/AdminPageHeader.vue'
import AdminTablePanel from '@admin/components/app/AdminTablePanel.vue'

const { t } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()

const statCards = computed(() => [
  { label: '系统模块', value: '6', note: '用户 / 角色 / 菜单 / 字典 / 日志 / 配置' },
  { label: '权限模型', value: 'RBAC', note: `${authStore.permissions.length} 个权限点已载入` },
  { label: '活跃主题', value: appStore.theme === 'default' ? 'Light' : 'Ocean', note: '双主题工作台已接入' },
  { label: '语言环境', value: appStore.locale === 'zh-CN' ? '中文' : 'English', note: '中英文切换即时生效' },
])

const todoColumns = [
  { title: '事项', dataIndex: 'title', key: 'title' },
  { title: '优先级', dataIndex: 'priority', key: 'priority' },
  { title: '说明', dataIndex: 'detail', key: 'detail' },
]

const todoItems = [
  { title: '检查高权限角色分配', priority: '高', detail: '核对 admin 与 editor 的菜单授权边界。' },
  { title: '补齐系统配置默认值', priority: '中', detail: '确认 theme 与 security 分组配置项完整性。' },
  { title: '审阅最近失败日志', priority: '中', detail: '定位连续失败登录与操作异常原因。' },
  { title: '清理无效菜单节点', priority: '低', detail: '去除未挂接路由的历史权限节点。' },
]

const features = [
  { title: '路由与权限统一', desc: '菜单展示、页面访问和按钮权限使用同一套 RBAC 数据源。', tag: 'Permission' },
  { title: 'Mock 到真实接口平滑切换', desc: '页面状态和接口结构已解耦，后续接真实后端不会推翻页面层。', tag: 'Mock Ready' },
  { title: '管理页模板可复制', desc: '查询区、表格区、详情区已经统一成同一种后台页面骨架。', tag: 'Reusable' },
]
</script>
