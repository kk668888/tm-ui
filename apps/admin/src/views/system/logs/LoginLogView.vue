<template>
  <section class="admin-page-section">
    <div>
      <h2 class="mb-2 text-2xl font-semibold">登录日志</h2>
      <p class="admin-muted">记录登录尝试、终端信息和结果。</p>
    </div>
    <tm-card>
      <div class="mb-4 flex gap-3">
        <tm-input v-model="query.keyword" placeholder="用户名 / 浏览器 / 结果" style="width: 260px" />
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
import type { LoginLogRecord } from '@admin/types'
import StatusTag from '@admin/components/app/StatusTag.vue'

const list = ref<LoginLogRecord[]>([])
const loading = ref(false)
const total = ref(0)
const query = reactive({ page: 1, pageSize: 10, keyword: '' })

const columns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: 'IP', dataIndex: 'ip', key: 'ip' },
  { title: '浏览器', dataIndex: 'browser', key: 'browser' },
  { title: '系统', dataIndex: 'os', key: 'os' },
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
    const result = await logApi.loginList(query)
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
