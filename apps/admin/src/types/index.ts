export type Language = 'zh-CN' | 'en-US'
export type UserStatus = 'enabled' | 'disabled'
export type MenuType = 'catalog' | 'menu' | 'button'

export interface PageQuery {
  page: number
  pageSize: number
  keyword?: string
  status?: string
  type?: string
  group?: string
  dateRange?: [string, string]
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  expiresAt: string
}

export interface UserSummary {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  status: UserStatus
  roleCodes: string[]
  createdAt: string
  lastLoginAt: string
}

export interface UserProfile {
  id: number
  username: string
  nickname: string
  email: string
  avatar: string
  roleCodes: string[]
  permissions: string[]
}

export interface RoleRecord {
  id: number
  name: string
  code: string
  status: UserStatus
  description: string
  menuIds: number[]
  permissions: string[]
  createdAt: string
}

export interface MenuRecord {
  id: number
  parentId: number | null
  type: MenuType
  title: string
  titleKey: string
  path: string
  icon?: string
  component?: string
  permission?: string
  hidden?: boolean
  keepAlive?: boolean
  sort: number
  status: UserStatus
  children?: MenuRecord[]
}

export interface DictTypeRecord {
  id: number
  name: string
  code: string
  status: UserStatus
  description: string
  createdAt: string
}

export interface DictItemRecord {
  id: number
  typeCode: string
  label: string
  value: string
  sort: number
  status: UserStatus
  remark: string
}

export interface LogRecord {
  id: number
  module: string
  action: string
  operator: string
  ip: string
  status: 'success' | 'failed'
  createdAt: string
  detail: string
}

export interface LoginLogRecord {
  id: number
  username: string
  ip: string
  browser: string
  os: string
  status: 'success' | 'failed'
  createdAt: string
  detail: string
}

export interface SystemConfigRecord {
  id: number
  group: string
  key: string
  name: string
  type: 'boolean' | 'string' | 'number' | 'select'
  value: string | number | boolean
  options?: Array<{ label: string; value: string }>
  description: string
  status: UserStatus
}

export interface RouteMenuItem {
  key: string
  title: string
  path: string
  icon?: string
  children?: RouteMenuItem[]
}

export interface CrudModalMode {
  type: 'create' | 'edit' | 'detail'
  id?: number
}
