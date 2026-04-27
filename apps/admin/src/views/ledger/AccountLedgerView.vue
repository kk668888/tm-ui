<template>
  <section class="admin-page-section">
    <LedgerPageHeader :total="filteredRecords.length" />
    <LedgerTypeFilters
      :active-type="activeType"
      :more-type="moreType"
      :more-type-options="moreTypeOptions"
      :type-tabs="typeTabs"
      @update:active-type="activeType = $event"
      @update:more-type="moreType = $event"
    />
    <LedgerSearchFilters
      :department-options="departmentOptions"
      :filters="filters"
      :status-options="statusOptions"
      @update:filters="patchFilters"
    />
    <LedgerSummaryBar
      :active-level="activeLevel"
      :hide-unlinked="hideUnlinked"
      :level-summary="levelSummary"
      :total="filteredRecords.length"
      @update:active-level="activeLevel = $event"
      @update:dense-mode="denseMode = $event"
      @update:hide-unlinked="hideUnlinked = $event"
    />
    <LedgerTable
      :columns="columns"
      :data-source="tableData"
      :dense-mode="denseMode"
      :selected-row-keys="selectedRowKeys"
      @update:selected-row-keys="selectedRowKeys = $event"
    />
  </section>
</template>

<script setup lang="ts">
import LedgerPageHeader from './components/LedgerPageHeader.vue'
import LedgerSearchFilters from './components/LedgerSearchFilters.vue'
import LedgerSummaryBar from './components/LedgerSummaryBar.vue'
import LedgerTable from './components/LedgerTable.vue'
import LedgerTypeFilters from './components/LedgerTypeFilters.vue'
import { useLedgerPage } from './composables/useLedgerPage'
import type { LedgerFilters } from './types'
import './ledger.css'

const {
  activeLevel,
  activeType,
  columns,
  denseMode,
  departmentOptions,
  filteredRecords,
  filters,
  hideUnlinked,
  levelSummary,
  moreType,
  moreTypeOptions,
  selectedRowKeys,
  statusOptions,
  tableData,
  typeTabs,
} = useLedgerPage()

function patchFilters(nextFilters: LedgerFilters) {
  Object.assign(filters, nextFilters)
}
</script>
