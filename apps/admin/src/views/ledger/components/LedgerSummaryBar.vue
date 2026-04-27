<template>
  <div class="admin-shell-card rounded-[26px] p-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3">
        <div class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          共 {{ total }} 项
        </div>
        <tm-button
          v-for="level in levelSummary"
          :key="level.key"
          class="ledger-pill"
          :class="{ 'ledger-pill-active': activeLevel === level.key }"
          @click="$emit('update:activeLevel', level.key)"
        >
          {{ level.label }} {{ level.count }}
        </tm-button>
      </div>
      <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <tm-button type="text" class="px-0" @click="$emit('update:denseMode', false)">展开</tm-button>
        <tm-button type="text" class="px-0" @click="$emit('update:denseMode', true)">折叠</tm-button>
        <tm-checkbox :model-value="hideUnlinked" @update:model-value="$emit('update:hideUnlinked', $event)">
          隐藏未挂接台账
        </tm-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LedgerLevelFilter, LedgerLevelSummaryItem } from '../types'

defineProps<{
  activeLevel: LedgerLevelFilter
  hideUnlinked: boolean
  levelSummary: LedgerLevelSummaryItem[]
  total: number
}>()

defineEmits<{
  'update:activeLevel': [value: LedgerLevelFilter]
  'update:denseMode': [value: boolean]
  'update:hideUnlinked': [value: boolean]
}>()
</script>
