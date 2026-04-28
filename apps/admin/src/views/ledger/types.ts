export interface LedgerRecord {
  id: number
  name: string
  code: string
  ip: string
  type: Exclude<LedgerTypeKey, 'all'>
  typeLabel: string
  typeTone: 'blue' | 'green' | 'sky' | 'cyan' | 'orange' | 'indigo'
  status: '已登记' | '待确认'
  department: string
  creator: string
  createdAt: string
  updatedAt: string
  linked: boolean
}

export type LedgerLevelFilter = 'all' | '一级' | '二级' | '未挂接'
export type LedgerTypeKey =
  | 'all'
  | 'server'
  | 'app'
  | 'database'
  | 'middleware'
  | 'template'
  | 'finance'
  | 'storage'
  | 'container'
  | 'network'
  | 'security'

export interface LedgerTypeTab {
  key: LedgerTypeKey
  label: string
  tone: 'blue' | 'green' | 'sky' | 'cyan' | 'orange' | 'indigo'
}

export interface LedgerFilters {
  keyword: string
  status?: string
  department?: string
}

export interface LedgerLevelSummaryItem {
  key: LedgerLevelFilter
  label: string
  count: number
}
