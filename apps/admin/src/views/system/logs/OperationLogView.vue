<template>
  <section class="admin-page-section">
    <div>
      <h2 class="mb-2 text-2xl font-semibold">操作日志</h2>
      <p class="admin-muted">记录后台业务操作，支持分页和关键词过滤。</p>
    </div>
    <tm-card>
      <div class="mb-4 flex gap-3">
        <tm-input v-model="query.keyword" placeholder="模块 / 操作人 / 详情" style="width: 260px" />
        <tm-button type="primary" @click="loadData">查询</tm-button>
      </div>
      <a-table :data-source="list" :columns="columns" row-key="id" :loading="loading" :pagination="pagination" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <StatusTag :value="record.status" />
          </template>
        </template>
      </a-table>
    </tm-card>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import { logApi } from '@admin/api/system'
import type { LogRecord } from '@admin/types'
import StatusTag from '@admin/components/app/StatusTag.vue'

const list = ref<LogRecord[]>([])
const loading = ref(false)
const total = ref(0)
const query = reactive({ page: 1, pageSize: 10, keyword: '' })

const columns = [
  { title: '模块', dataIndex: 'module', key: 'module' },
  { title: '动作', dataIndex: 'action', key: 'action' },
  { title: '操作人', dataIndex: 'operator', key: 'operator' },
  { title: '状态', key: 'status' },
  { title: '时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '详情', dataIndex: 'detail', key: 'detail' },
]

const pagination = computed<TablePaginationConfig>(() => ({
  current: query.page,
  pageSize: query.pageSize,
  total: total.value,
  showSizeChanger: true,
}))

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

function handleTableChange(paginationConfig: TablePaginationConfig) {
  query.page = paginationConfig.current ?? 1
  query.pageSize = paginationConfig.pageSize ?? 10
  loadData()
}

onMounted(loadData)
</script>
