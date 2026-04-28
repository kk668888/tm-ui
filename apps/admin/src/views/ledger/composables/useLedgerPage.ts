import { computed, reactive, ref } from 'vue'
import {
  ledgerColumns,
  ledgerDepartmentOptions,
  ledgerDisplayTotal,
  ledgerMoreTypeOptions,
  ledgerRecords,
  ledgerStatusOptions,
  ledgerTypeCount,
  ledgerTypeTabs,
} from '../data'
import type { LedgerFilters, LedgerTypeKey } from '../types'

export function useLedgerPage() {
  const records = ref(ledgerRecords)
  const filters = reactive<LedgerFilters>({
    keyword: '',
    status: undefined,
    department: undefined,
  })

  const activeType = ref<LedgerTypeKey>('all')
  const moreType = ref<Exclude<LedgerTypeKey, 'all'> | undefined>()

  const filteredRecords = computed(() =>
    records.value.filter((item) => {
      const keywordMatched =
        !filters.keyword ||
        [item.name, item.code, item.ip].some((value) =>
          value.toLowerCase().includes(filters.keyword.trim().toLowerCase()),
        )
      const statusMatched = !filters.status || item.status === filters.status
      const departmentMatched = !filters.department || item.department === filters.department
      const typeKey = moreType.value || activeType.value
      const typeMatched = typeKey === 'all' || item.type === typeKey

      return keywordMatched && statusMatched && departmentMatched && typeMatched
    }),
  )

  const tableData = computed(() =>
    [...filteredRecords.value].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
  )

  return {
    activeType,
    columns: ledgerColumns,
    departmentOptions: ledgerDepartmentOptions,
    displayTotal: ledgerDisplayTotal,
    filteredRecords,
    filters,
    moreType,
    moreTypeOptions: ledgerMoreTypeOptions,
    statusOptions: ledgerStatusOptions,
    tableData,
    typeCount: ledgerTypeCount,
    typeTabs: ledgerTypeTabs,
  }
}
