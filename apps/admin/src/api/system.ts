import { http } from './http'
import type {
  DictItemRecord,
  DictTypeRecord,
  LogRecord,
  LoginLogRecord,
  MenuRecord,
  PageQuery,
  PageResult,
  RoleRecord,
  SystemConfigRecord,
  UserSummary,
} from '@admin/types'

export const userApi = {
  list(params: PageQuery) {
    return http.get<never, PageResult<UserSummary>>('/system/users', { params })
  },
  detail(id: number) {
    return http.get<never, UserSummary>(`/system/users/${id}`)
  },
  save(payload: Partial<UserSummary>) {
    return payload.id
      ? http.put<never, UserSummary>(`/system/users/${payload.id}`, payload)
      : http.post<never, UserSummary>('/system/users', payload)
  },
  remove(id: number) {
    return http.delete<never, boolean>(`/system/users/${id}`)
  },
}

export const roleApi = {
  list(params: PageQuery) {
    return http.get<never, PageResult<RoleRecord>>('/system/roles', { params })
  },
  save(payload: Partial<RoleRecord>) {
    return payload.id
      ? http.put<never, RoleRecord>(`/system/roles/${payload.id}`, payload)
      : http.post<never, RoleRecord>('/system/roles', payload)
  },
  remove(id: number) {
    return http.delete<never, boolean>(`/system/roles/${id}`)
  },
  assign(payload: { roleId: number; menuIds: number[]; permissions: string[] }) {
    return http.put<never, RoleRecord>(`/system/roles/${payload.roleId}/assign`, payload)
  },
}

export const menuApi = {
  list() {
    return http.get<never, MenuRecord[]>('/system/menus')
  },
  save(payload: Partial<MenuRecord>) {
    return payload.id
      ? http.put<never, MenuRecord>(`/system/menus/${payload.id}`, payload)
      : http.post<never, MenuRecord>('/system/menus', payload)
  },
  remove(id: number) {
    return http.delete<never, boolean>(`/system/menus/${id}`)
  },
}

export const dictApi = {
  typeList(params: PageQuery) {
    return http.get<never, PageResult<DictTypeRecord>>('/system/dict-types', { params })
  },
  typeSave(payload: Partial<DictTypeRecord>) {
    return payload.id
      ? http.put<never, DictTypeRecord>(`/system/dict-types/${payload.id}`, payload)
      : http.post<never, DictTypeRecord>('/system/dict-types', payload)
  },
  typeRemove(id: number) {
    return http.delete<never, boolean>(`/system/dict-types/${id}`)
  },
  itemList(typeCode: string) {
    return http.get<never, DictItemRecord[]>(`/system/dict-types/${typeCode}/items`)
  },
  itemSave(payload: Partial<DictItemRecord>) {
    return payload.id
      ? http.put<never, DictItemRecord>(`/system/dict-items/${payload.id}`, payload)
      : http.post<never, DictItemRecord>('/system/dict-items', payload)
  },
  itemRemove(id: number) {
    return http.delete<never, boolean>(`/system/dict-items/${id}`)
  },
}

export const logApi = {
  operationList(params: PageQuery) {
    return http.get<never, PageResult<LogRecord>>('/system/logs/operation', { params })
  },
  loginList(params: PageQuery) {
    return http.get<never, PageResult<LoginLogRecord>>('/system/logs/login', { params })
  },
}

export const configApi = {
  list(params: PageQuery) {
    return http.get<never, PageResult<SystemConfigRecord>>('/system/configs', { params })
  },
  save(payload: Partial<SystemConfigRecord>) {
    return payload.id
      ? http.put<never, SystemConfigRecord>(`/system/configs/${payload.id}`, payload)
      : http.post<never, SystemConfigRecord>('/system/configs', payload)
  },
  remove(id: number) {
    return http.delete<never, boolean>(`/system/configs/${id}`)
  },
}
