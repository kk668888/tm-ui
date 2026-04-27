<template>
  <div class="admin-shell-card rounded-[26px] p-4">
    <div class="grid gap-3 xl:grid-cols-[1.2fr_0.6fr_0.6fr_auto]">
      <tm-input :model-value="filters.keyword" placeholder="搜索名称、编码、IP" @update:model-value="updateField('keyword', $event)" />
      <tm-select
        :model-value="filters.status"
        :options="statusOptions"
        placeholder="全部状态"
        allow-clear
        @update:model-value="updateField('status', $event)"
      />
      <tm-select
        :model-value="filters.department"
        :options="departmentOptions"
        placeholder="所属单位"
        allow-clear
        @update:model-value="updateField('department', $event)"
      />
      <tm-button>
        高级筛选
      </tm-button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
