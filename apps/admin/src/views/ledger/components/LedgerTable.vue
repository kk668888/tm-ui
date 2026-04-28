<template>
  <div class="admin-shell-card ledger-table-card">
    <tm-table
      class="ledger-table"
      :data-source="dataSource"
      :columns="columns"
      row-key="id"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <tm-button type="link" class="ledger-name-button">
            {{ record.name }}
          </tm-button>
        </template>
        <template v-else-if="column.key === 'type'">
          <tm-tag class="ledger-type-tag" :class="`ledger-type-tag-${record.typeTone}`">
            <span class="ledger-type-tag-inner">
              <span class="ledger-type-tag-dot" />
              {{ record.typeLabel }}
            </span>
          </tm-tag>
        </template>
        <template v-else-if="column.key === 'status'">
          <tm-tag class="ledger-status-tag">
            {{ record.status }}
          </tm-tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <div class="ledger-action-group">
            <tm-button type="link" class="ledger-action-button ledger-maintain-button" @click="goEdit(record.id)">维护</tm-button>
            <tm-button type="link" class="ledger-action-button ledger-offline-button">退网</tm-button>
          </div>
        </template>
      </template>
    </tm-table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { LedgerRecord } from '../types'

defineProps<{
  columns: Array<Record<string, unknown>>
  dataSource: LedgerRecord[]
}>()

const router = useRouter()

function goEdit(id: number) {
  router.push(`/ledger/${id}/edit`)
}
</script>

<style scoped>
.ledger-table-card {
  overflow: hidden;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.ledger-action-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

:deep(.ledger-name-button.tm-btn.ant-btn-link) {
  height: auto;
  padding: 0;
  color: #2563eb;
  font-size: 14px;
  font-weight: 600;
}

:deep(.ledger-name-button.tm-btn.ant-btn-link:hover) {
  color: #1d4ed8;
}

:deep(.ledger-table .ant-table) {
  background: #fff;
}

:deep(.ledger-table .ant-table-container) {
  border-inline-start: 0 !important;
}

:deep(.ledger-table .ant-table-thead > tr > th) {
  height: 52px;
  padding: 0 16px;
  background: #f5f5f5;
  color: #334155;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #eceff5;
}

:deep(.ledger-table .ant-table-tbody > tr > td) {
  padding: 12px 16px;
  color: #475569;
  font-size: 14px;
  border-bottom: 1px solid #edf1f6;
  background: #fff;
}

:deep(.ledger-table .ant-table-tbody > tr:hover > td) {
  background: #fafcff;
}

:deep(.ledger-table .ant-table-column-sorter) {
  color: #b8c1d1;
}

:deep(.ledger-table .ant-table-column-sorter-up.active),
:deep(.ledger-table .ant-table-column-sorter-down.active) {
  color: #4a7bff;
}

:deep(.ledger-type-tag.tm-tag) {
  margin-inline-end: 0;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  background: #fff;
}

.ledger-type-tag-inner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ledger-type-tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
}

:deep(.ledger-type-tag-blue.tm-tag) {
  border-color: #b7d3ff;
  color: #4096ff;
  background: #f4f9ff;
}

:deep(.ledger-type-tag-green.tm-tag) {
  border-color: #b7e2a0;
  color: #6dbf3d;
  background: #f8fff1;
}

:deep(.ledger-type-tag-sky.tm-tag) {
  border-color: #b8d7ff;
  color: #4096ff;
  background: #f4f9ff;
}

:deep(.ledger-type-tag-cyan.tm-tag) {
  border-color: #bfeef5;
  color: #13c2c2;
  background: #f1feff;
}

:deep(.ledger-type-tag-orange.tm-tag) {
  border-color: #ffd69a;
  color: #fa8c16;
  background: #fff7ed;
}

:deep(.ledger-type-tag-indigo.tm-tag) {
  border-color: #c6dcff;
  color: #5aa0ff;
  background: #f4f8ff;
}

:deep(.ledger-status-tag.tm-tag) {
  margin-inline-end: 0;
  padding: 2px 10px;
  border-radius: 999px;
  border-color: #9dd77a;
  color: #2ca54f;
  background: #f7fff5;
  font-size: 13px;
  font-weight: 600;
}

:deep(.ledger-action-button.tm-btn.ant-btn-link) {
  height: auto;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
}

:deep(.ledger-maintain-button.tm-btn.ant-btn-link) {
  color: #2563eb;
}

:deep(.ledger-offline-button.tm-btn.ant-btn-link) {
  color: #ef4444;
}
</style>
