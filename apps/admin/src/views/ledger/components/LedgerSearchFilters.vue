<template>
  <div class="admin-panel ledger-search-card">
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
  padding: 16px 18px;
}

.ledger-search-grid {
  display: grid;
  grid-template-columns: 360px 158px 158px;
  gap: 12px;
}

.ledger-search-icon {
  color: var(--admin-text-faint);
  font-size: 14px;
}

:deep(.ledger-search-input .ant-input-affix-wrapper),
:deep(.ledger-filter-select .ant-select-selector) {
  height: 36px !important;
}

:deep(.ledger-search-input .ant-input) {
  font-size: 13px;
}

:deep(.ledger-filter-select .ant-select-selection-item) {
  line-height: 34px !important;
}

@media (max-width: 1200px) {
  .ledger-search-grid {
    grid-template-columns: 1fr;
  }
}
</style>
