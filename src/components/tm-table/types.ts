import type { TmSorterState } from '../shared-types'

export interface TmColumn<T = Record<string, unknown>> {
  title: string
  dataIndex?: string
  key: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  ellipsis?: boolean
  fixed?: 'left' | 'right'
  sorter?: boolean | ((a: T, b: T) => number)
  slots?: {
    customRender?: string
  }
}

export interface TmPageInfo {
  current: number
  pageSize: number
  total: number
}

export interface TmTableProps<T = Record<string, unknown>> {
  dataSource: T[]
  columns: TmColumn<T>[]
  loading?: boolean
  rowKey?: string | ((record: T) => string)
  pagination?: TmPageInfo | false
  bordered?: boolean
  stripe?: boolean
  scroll?: { x?: number; y?: number }
}

export interface TmTableEmits<T = Record<string, unknown>> {
  (e: 'page-change', page: number, pageSize: number): void
  (e: 'sort-change', sorter: TmSorterState): void
  (e: 'row-click', record: T, index: number): void
  (e: 'change', pagination: TmPageInfo, filters: Record<string, unknown>, sorter?: TmSorterState): void
}

