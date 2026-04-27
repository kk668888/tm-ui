export interface LedgerRecord {
  id: number
  name: string
  code: string
  ip: string
  type: string
  level: '一级' | '二级' | '未挂接'
  status: '已登记' | '待确认'
  businessName: string
  domain: string
  environment: '生产' | '测试'
  networkRegion: string
  department: string
  createdAt: string
  updatedAt: string
  assets: number
  services: number
  linked: boolean
}

export type LedgerLevelFilter = 'all' | LedgerRecord['level']
export type LedgerTypeKey = 'all' | 'server' | 'app' | 'database' | 'middleware' | 'template' | 'finance'

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
