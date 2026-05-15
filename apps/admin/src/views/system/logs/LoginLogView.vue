<template>
  <section class="admin-page">
    <AdminPageHeader title="登录日志" description="记录登录尝试、终端信息与认证结果。"></AdminPageHeader>

    <AdminFilterPanel>
      <tm-form-item class="admin-filter-item admin-filter-item-wide" label="关键词">
        <tm-input v-model="query.keyword" placeholder="用户名 / 浏览器 / 结果" />
      </tm-form-item>
      <template #actions>
        <tm-button type="primary" @click="loadData">查询</tm-button>
        <tm-button @click="resetQuery">重置</tm-button>
      </template>
    </AdminFilterPanel>

    <AdminTablePanel title="日志列表" description="辅助识别异常终端和连续失败登录。">
      <template #meta>
        <div class="admin-pill">共 {{ total }} 条记录</div>
        <div class="admin-pill">成功 {{ successCount }}</div>
        <div class="admin-pill">失败 {{ failedCount }}</div>
      </template>
      <tm-table class="admin-data-table" :data-source="list" :columns="columns" row-key="id" :loading="loading" :pagination="pagination" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'username'">
            <div class="login-primary-cell">
              <div class="login-primary-main">{{ record.username }}</div>
              <div class="login-primary-sub admin-code">{{ record.ip }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'browser'">
            <div class="login-primary-cell">
              <div class="login-primary-main">{{ record.browser }}</div>
              <div class="login-primary-sub">{{ record.os }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'createdAt'">
            <div class="login-primary-cell">
              <div class="login-primary-main">{{ record.createdAt }}</div>
              <div class="login-primary-sub">{{ record.detail }}</div>
            </div>
          </template>
        </template>
      </tm-table>
    </AdminTablePanel>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import { logApi } from '@admin/api/system'
import type { LoginLogRecord } from '@admin/types'
import AdminFilterPanel from '@admin/components/app/AdminFilterPanel.vue'
import AdminPageHeader from '@admin/components/app/AdminPageHeader.vue'
import AdminTablePanel from '@admin/components/app/AdminTablePanel.vue'
import StatusTag from '@admin/components/app/StatusTag.vue'

const list = ref<LoginLogRecord[]>([])
const loading = ref(false)
const total = ref(0)
const query = reactive({ page: 1, pageSize: 10, keyword: '' })

const columns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '浏览器', dataIndex: 'browser', key: 'browser' },
  { title: '状态', key: 'status' },
  { title: '时间', dataIndex: 'createdAt', key: 'createdAt' },
]

const pagination = computed<TablePaginationConfig>(() => ({
  current: query.page,
  pageSize: query.pageSize,
  total: total.value,
  showSizeChanger: true,
}))
const successCount = computed(() => list.value.filter((item) => item.status === 'success').length)
const failedCount = computed(() => list.value.filter((item) => item.status === 'failed').length)

async function loadData() {
  loading.value = true
  try {
    const result = await logApi.loginList(query)
    list.value = result.list
    total.value = result.total
  } finally {
    loading.value = false
  }
}

function resetQuery() {
  query.page = 1
  query.pageSize = 10
  query.keyword = ''
  loadData()
}

function handleTableChange(paginationConfig: TablePaginationConfig) {
  query.page = paginationConfig.current ?? 1
  query.pageSize = paginationConfig.pageSize ?? 10
  loadData()
}

onMounted(loadData)
</script>

<style scoped>
.login-primary-cell {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.login-primary-main {
  color: var(--admin-text-strong);
  font-weight: 600;
}

.login-primary-sub {
  color: var(--admin-text-soft);
  font-size: 12px;
}
</style>
