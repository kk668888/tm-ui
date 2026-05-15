<template>
  <section class="admin-page ledger-page">
    <LedgerPageHeader :total="displayTotal" />
    <LedgerTypeFilters
      :active-type="activeType"
      :more-type="moreType"
      :more-type-options="moreTypeOptions"
      :type-count="typeCount"
      :type-tabs="typeTabs"
      @update:active-type="handleActiveTypeChange"
      @update:more-type="handleMoreTypeChange"
    />
    <LedgerSearchFilters
      :department-options="departmentOptions"
      :filters="filters"
      :status-options="statusOptions"
      @update:filters="patchFilters"
    />
    <LedgerTable
      :columns="columns"
      :data-source="tableData"
    />
  </section>
</template>

<script setup lang="ts">
import LedgerPageHeader from './components/LedgerPageHeader.vue'
import LedgerSearchFilters from './components/LedgerSearchFilters.vue'
import LedgerTable from './components/LedgerTable.vue'
import LedgerTypeFilters from './components/LedgerTypeFilters.vue'
import { useLedgerPage } from './composables/useLedgerPage'
import type { LedgerFilters } from './types'

const {
  activeType,
  columns,
  departmentOptions,
  displayTotal,
  filters,
  moreType,
  moreTypeOptions,
  statusOptions,
  tableData,
  typeCount,
  typeTabs,
} = useLedgerPage()

function patchFilters(nextFilters: LedgerFilters) {
  Object.assign(filters, nextFilters)
}

function handleActiveTypeChange(value: typeof activeType.value) {
  activeType.value = value
  moreType.value = undefined
}

function handleMoreTypeChange(value: typeof moreType.value) {
  moreType.value = value
  if (value) {
    activeType.value = 'all'
  }
}
</script>

<style scoped>
.ledger-page {
  gap: 16px;
}
</style>
