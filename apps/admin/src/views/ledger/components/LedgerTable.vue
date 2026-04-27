<template>
  <div class="admin-shell-card overflow-hidden rounded-[30px]">
    <tm-table
      :data-source="dataSource"
      :columns="columns"
      row-key="id"
      :pagination="false"
      :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div class="flex flex-col gap-2 py-1">
            <a class="ledger-link">{{ record.name }}</a>
            <div v-if="!denseMode" class="flex flex-wrap items-center gap-2">
              <span class="ledger-mini-chip ledger-mini-chip-blue">关联资产 {{ record.assets }} 台</span>
              <span class="ledger-mini-chip ledger-mini-chip-green">服务组件 {{ record.services }} 个</span>
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'status'">
          <span class="ledger-status">{{ record.status }}</span>
        </template>
        <template v-else-if="column.key === 'updatedAt'">
          <span class="text-[var(--admin-primary)]">{{ record.updatedAt }}</span>
        </template>
        <template v-else-if="column.key === 'actions'">
          <div class="flex items-center justify-end gap-3">
            <a class="ledger-link">更多</a>
            <span class="text-slate-400">•••</span>
          </div>
        </template>
      </template>
    </tm-table>
  </div>
</template>

<script setup lang="ts">
import type { LedgerRecord } from '../types'

defineProps<{
  columns: Array<Record<string, unknown>>
  dataSource: LedgerRecord[]
  denseMode: boolean
  selectedRowKeys: number[]
}>()

const emit = defineEmits<{
  'update:selectedRowKeys': [value: number[]]
}>()

function onSelectChange(keys: Array<string | number>) {
  emit('update:selectedRowKeys', keys.map(Number))
}
</script>
