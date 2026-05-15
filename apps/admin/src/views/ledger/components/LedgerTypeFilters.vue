<template>
  <div class="admin-panel ledger-filter-card">
    <div class="ledger-type-row">
      <div class="ledger-type-label-wrap">
        <span class="ledger-type-label">类型</span>
        <span class="ledger-type-count">{{ typeCount }}</span>
      </div>
      <tm-button
        v-for="type in typeTabs"
        :key="type.key"
        class="ledger-chip"
        :class="{ 'ledger-chip-active': activeType === type.key, [`ledger-chip-${type.tone}`]: true }"
        @click="$emit('update:activeType', type.key)"
      >
        <span class="ledger-chip-dot" />
        {{ type.label }}
      </tm-button>
      <tm-select
        :model-value="moreType"
        class="ledger-more-select"
        style="width: 148px"
        :options="moreTypeOptions"
        placeholder="更多类型"
        allow-clear
        @update:model-value="$emit('update:moreType', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LedgerTypeKey, LedgerTypeTab } from '../types'

defineProps<{
  activeType: LedgerTypeKey
  moreType?: Exclude<LedgerTypeKey, 'all'>
  moreTypeOptions: Array<{ label: string; value: string }>
  typeCount: number
  typeTabs: LedgerTypeTab[]
}>()

defineEmits<{
  'update:activeType': [value: LedgerTypeKey]
  'update:moreType': [value?: Exclude<LedgerTypeKey, 'all'>]
}>()
</script>

<style scoped>
.ledger-filter-card {
  padding: 14px 16px;
}

.ledger-type-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.ledger-type-label-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 2px;
}

.ledger-type-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--admin-text-soft);
}

.ledger-type-count {
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--admin-primary-soft);
  color: var(--admin-primary);
  font-size: 13px;
  font-weight: 700;
}

:deep(.ledger-chip.tm-btn.ant-btn) {
  --ledger-chip-color: var(--admin-primary);
  --ledger-chip-border: var(--admin-border);
  --ledger-chip-bg: var(--admin-primary-soft);
  height: 32px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border-color: var(--ledger-chip-border);
  background: var(--admin-surface);
  color: var(--admin-text-soft);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  box-shadow: none;
}

:deep(.ledger-chip.tm-btn.ant-btn > span) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

:deep(.ledger-chip.tm-btn.ant-btn:hover),
:deep(.ledger-chip.tm-btn.ant-btn:focus),
:deep(.ledger-chip.tm-btn.ant-btn:active) {
  color: var(--ledger-chip-color);
  border-color: var(--ledger-chip-border);
  background: #fff;
}

:deep(.ledger-chip-active.tm-btn.ant-btn),
:deep(.ledger-chip-active.tm-btn.ant-btn:hover),
:deep(.ledger-chip-active.tm-btn.ant-btn:focus),
:deep(.ledger-chip-active.tm-btn.ant-btn:active) {
  color: var(--ledger-chip-color);
  border-color: var(--admin-primary-soft-strong);
  background: var(--ledger-chip-bg);
  box-shadow: none;
}

.ledger-chip-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--ledger-chip-color);
  flex: 0 0 auto;
}

.ledger-chip-blue {
  --ledger-chip-color: #2563eb;
  --ledger-chip-border: #c6d4eb;
  --ledger-chip-bg: #edf4ff;
}

.ledger-chip-green {
  --ledger-chip-color: #6dbf3d;
  --ledger-chip-border: #c8e7af;
  --ledger-chip-bg: #f8fff1;
}

.ledger-chip-sky {
  --ledger-chip-color: #4b9dff;
  --ledger-chip-border: #b7d8ff;
  --ledger-chip-bg: #f5faff;
}

.ledger-chip-cyan {
  --ledger-chip-color: #26c6da;
  --ledger-chip-border: #bceef5;
  --ledger-chip-bg: #f2fdff;
}

.ledger-chip-orange {
  --ledger-chip-color: #ff9800;
  --ledger-chip-border: #ffd59a;
  --ledger-chip-bg: #fff8ee;
}

.ledger-chip-indigo {
  --ledger-chip-color: #65a9ff;
  --ledger-chip-border: #c5ddff;
  --ledger-chip-bg: #f4f8ff;
}

:deep(.ledger-more-select.ant-select) {
  min-width: 148px;
}

:deep(.ledger-more-select .ant-select-selector) {
  height: 32px !important;
  border-radius: 999px !important;
}

:deep(.ledger-more-select .ant-select-selection-placeholder),
:deep(.ledger-more-select .ant-select-selection-item) {
  line-height: 30px !important;
  color: var(--admin-text-soft);
}
</style>
