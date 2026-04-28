<template>
  <div class="admin-shell-card ledger-search-card">
    <div class="ledger-search-grid">
      <tm-input class="ledger-search-input" :model-value="filters.keyword" placeholder="搜索名称、编码、IP" @update:model-value="updateField('keyword', $event)">
        <template #prefix>
          <SearchOutlined class="ledger-search-icon" />
        </template>
      </tm-input>
      <tm-select
        class="ledger-filter-select"
        :model-value="filters.status"
        :options="statusOptions"
        placeholder="全部状态"
        allow-clear
        @update:model-value="updateField('status', $event)"
      />
      <tm-select
        class="ledger-filter-select"
        :model-value="filters.department"
        :options="departmentOptions"
        placeholder="所属单位"
        allow-clear
        @update:model-value="updateField('department', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'
import type { LedgerFilters } from '../types'

const props = defineProps<{
  departmentOptions: Array<{ label: string; value: string }>
  filters: LedgerFilters
  statusOptions: Array<{ label: string; value: string }>
}>()

const emit = defineEmits<{
  'update:filters': [value: LedgerFilters]
}>()

function updateField<K extends keyof LedgerFilters>(key: K, value: LedgerFilters[K]) {
  emit('update:filters', {
    ...props.filters,
    [key]: value,
  })
}
</script>

<style scoped>
.ledger-search-card {
  padding: 12px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.ledger-search-grid {
  display: grid;
  grid-template-columns: 360px 158px 158px;
  gap: 10px;
}

.ledger-search-icon {
  color: #94a3b8;
  font-size: 14px;
}

:deep(.ledger-search-input .ant-input-affix-wrapper),
:deep(.ledger-filter-select .ant-select-selector) {
  height: 42px !important;
  border-radius: 8px !important;
  border-color: #d8dee9 !important;
  box-shadow: none !important;
}

:deep(.ledger-search-input .ant-input) {
  font-size: 14px;
}

:deep(.ledger-search-input .ant-input::placeholder),
:deep(.ledger-filter-select .ant-select-selection-placeholder) {
  color: #98a2b3;
}

:deep(.ledger-filter-select .ant-select-selection-item) {
  line-height: 40px !important;
}

@media (max-width: 1200px) {
  .ledger-search-grid {
    grid-template-columns: 1fr;
  }
}
</style>
