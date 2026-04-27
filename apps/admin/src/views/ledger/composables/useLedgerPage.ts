import { computed, reactive, ref } from 'vue'
import {
  ledgerColumns,
  ledgerDepartmentOptions,
  ledgerMoreTypeOptions,
  ledgerRecords,
  ledgerStatusOptions,
  ledgerTypeTabs,
} from '../data'
import type { LedgerFilters, LedgerLevelFilter, LedgerLevelSummaryItem, LedgerTypeKey } from '../types'

export function useLedgerPage() {
  const records = ref(ledgerRecords)
  const filters = reactive<LedgerFilters>({
    keyword: '',
    status: undefined,
    department: undefined,
  })

  const activeType = ref<LedgerTypeKey>('all')
  const moreType = ref<Exclude<LedgerTypeKey, 'all'> | undefined>()
  const activeLevel = ref<LedgerLevelFilter>('all')
  const hideUnlinked = ref(false)
  const denseMode = ref(false)
  const selectedRowKeys = ref<number[]>([])

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
      const levelMatched = activeLevel.value === 'all' || item.level === activeLevel.value
      const linkedMatched = !hideUnlinked.value || item.linked

      return keywordMatched && statusMatched && departmentMatched && typeMatched && levelMatched && linkedMatched
    }),
  )

  const levelSummary = computed<LedgerLevelSummaryItem[]>(() => [
    { key: '一级', label: '一级', count: filteredRecords.value.filter((item) => item.level === '一级').length },
    { key: '二级', label: '二级', count: filteredRecords.value.filter((item) => item.level === '二级').length },
    { key: '未挂接', label: '未挂接', count: filteredRecords.value.filter((item) => item.level === '未挂接').length },
  ])

  const tableData = computed(() =>
    [...filteredRecords.value].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
  )

  return {
    activeLevel,
    activeType,
    columns: ledgerColumns,
    denseMode,
    departmentOptions: ledgerDepartmentOptions,
    filteredRecords,
    filters,
    hideUnlinked,
    levelSummary,
    moreType,
    moreTypeOptions: ledgerMoreTypeOptions,
    selectedRowKeys,
    statusOptions: ledgerStatusOptions,
    tableData,
    typeTabs: ledgerTypeTabs,
  }
}
