<template>
  <section class="admin-page">
    <AdminPageHeader title="操作日志" description="记录后台业务操作，便于追溯行为和排查异常。"></AdminPageHeader>

    <AdminFilterPanel>
      <tm-form-item class="admin-filter-item admin-filter-item-wide" label="关键词">
        <tm-input v-model="query.keyword" placeholder="模块 / 操作人 / 详情" />
      </tm-form-item>
      <template #actions>
        <tm-button type="primary" @click="loadData">查询</tm-button>
        <tm-button @click="resetQuery">重置</tm-button>
      </template>
    </AdminFilterPanel>

    <AdminTablePanel title="日志列表" description="重点关注失败操作和高频修改模块。">
      <template #meta>
        <div class="admin-pill">共 {{ total }} 条记录</div>
        <div class="admin-pill">成功 {{ successCount }}</div>
        <div class="admin-pill">失败 {{ failedCount }}</div>
      </template>
      <tm-table class="admin-data-table" :data-source="list" :columns="columns" row-key="id" :loading="loading" :pagination="pagination" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'module'">
            <div class="log-primary-cell">
              <div class="log-primary-main">{{ record.module }}</div>
              <div class="log-primary-sub">{{ record.action }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'operator'">
            <div class="log-primary-cell">
              <div class="log-primary-main">{{ record.operator }}</div>
              <div class="log-primary-sub admin-code">{{ record.ip }}</div>
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
          <template v-else-if="column.key === 'createdAt'">
            <div class="log-primary-cell">
              <div class="log-primary-main">{{ record.createdAt }}</div>
              <div class="log-primary-sub">{{ record.detail }}</div>
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
import type { LogRecord } from '@admin/types'
import AdminFilterPanel from '@admin/components/app/AdminFilterPanel.vue'
import AdminPageHeader from '@admin/components/app/AdminPageHeader.vue'
import AdminTablePanel from '@admin/components/app/AdminTablePanel.vue'
import StatusTag from '@admin/components/app/StatusTag.vue'

const list = ref<LogRecord[]>([])
const loading = ref(false)
const total = ref(0)
const query = reactive({ page: 1, pageSize: 10, keyword: '' })

const columns = [
  { title: '模块', dataIndex: 'module', key: 'module' },
  { title: '操作人', dataIndex: 'operator', key: 'operator' },
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
    const result = await logApi.operationList(query)
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
.log-primary-cell {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.log-primary-main {
  color: var(--admin-text-strong);
  font-weight: 600;
}

.log-primary-sub {
  color: var(--admin-text-soft);
  font-size: 12px;
}
</style>
