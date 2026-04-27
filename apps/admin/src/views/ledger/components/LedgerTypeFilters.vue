<template>
  <div class="admin-shell-card rounded-[26px] p-4">
    <div class="flex flex-wrap items-center gap-3">
      <div class="text-sm font-medium text-slate-600">类型</div>
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
        style="width: 150px"
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
  typeTabs: LedgerTypeTab[]
}>()

defineEmits<{
  'update:activeType': [value: LedgerTypeKey]
  'update:moreType': [value?: Exclude<LedgerTypeKey, 'all'>]
}>()
</script>
