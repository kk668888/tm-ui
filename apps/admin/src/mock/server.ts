import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { mockDb, buildProfileByUserId } from './db'
import type {
  ApiResponse,
  DictItemRecord,
  DictTypeRecord,
  MenuRecord,
  PageQuery,
  PageResult,
  RoleRecord,
  SystemConfigRecord,
  UserSummary,
} from '@admin/types'

function ok<T>(data: T, config: InternalAxiosRequestConfig, message = 'ok'): Promise<AxiosResponse<ApiResponse<T>>> {
  return Promise.resolve({
    data: { code: 0, message, data },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  })
}

function fail(config: InternalAxiosRequestConfig, message: string, status = 400): Promise<AxiosResponse<ApiResponse<null>>> {
  return Promise.resolve({
    data: { code: status, message, data: null },
    status,
    statusText: 'Error',
    headers: {},
    config,
  })
}

function nextId(list: Array<{ id: number }>) {
  return Math.max(0, ...list.map((item) => item.id)) + 1
}

function paginate<T>(list: T[], query: PageQuery): PageResult<T> {
  const page = Number(query.page || 1)
  const pageSize = Number(query.pageSize || 10)
  const start = (page - 1) * pageSize

  return {
    list: list.slice(start, start + pageSize),
    total: list.length,
    page,
    pageSize,
  }
}

function matchKeyword<T extends object>(list: T[], keyword?: string) {
  if (!keyword) {
    return list
  }
  const normalized = keyword.toLowerCase()
  return list.filter((item) =>
    Object.values(item as Record<string, unknown>).some((value) => String(value).toLowerCase().includes(normalized)),
  )
}

function getToken(config: InternalAxiosRequestConfig) {
  const auth = config.headers.Authorization
  return String(auth ?? '').replace('Bearer ', '')
}

function parseBody<T>(config: InternalAxiosRequestConfig): T {
  if (!config.data) {
    return {} as T
  }

  return typeof config.data === 'string' ? JSON.parse(config.data) as T : config.data as T
}

export function createMockAdapter(): AxiosAdapter {
  return async (config) => {
    const { method = 'get', url = '' } = config
    const query = (config.params ?? {}) as PageQuery
    const token = getToken(config)
    const lowerMethod = method.toLowerCase()

    await new Promise((resolve) => setTimeout(resolve, 120))

    if (url === '/auth/login' && lowerMethod === 'post') {
      const body = parseBody<{ username: string; password: string }>(config)
      const user = mockDb.users.find((item) => item.username === body.username)
      if (!user || body.password !== '123456') {
        return fail(config, '用户名或密码错误', 401)
      }
      if (user.status !== 'enabled') {
        return fail(config, '账号已停用', 401)
      }
      const authToken = `token-${user.username}`
      mockDb.tokens[authToken] = user.id
      return ok({ token: authToken, expiresAt: '2026-12-31 23:59:59' }, config)
    }

    if (url === '/auth/logout' && lowerMethod === 'post') {
      return ok(true, config)
    }

    if (url === '/auth/profile' && lowerMethod === 'get') {
      const userId = mockDb.tokens[token]
      if (!userId) {
        return fail(config, '未登录', 401)
      }
      return ok(buildProfileByUserId(userId), config)
    }

    if (url === '/system/users' && lowerMethod === 'get') {
      let list = [...mockDb.users]
      list = matchKeyword(list, query.keyword)
      if (query.status) {
        list = list.filter((item) => item.status === query.status)
      }
      return ok(paginate(list, query), config)
    }

    if (url?.startsWith('/system/users/') && lowerMethod === 'get') {
      const id = Number(url.split('/').pop())
      const user = mockDb.users.find((item) => item.id === id)
      return user ? ok(user, config) : fail(config, '用户不存在', 404)
    }

    if (url === '/system/users' && lowerMethod === 'post') {
      const body = parseBody<Partial<UserSummary>>(config)
      const record: UserSummary = {
        id: nextId(mockDb.users),
        username: body.username ?? '',
        nickname: body.nickname ?? '',
        email: body.email ?? '',
        phone: body.phone ?? '',
        status: body.status ?? 'enabled',
        roleCodes: body.roleCodes ?? ['editor'],
        createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
        lastLoginAt: '-',
      }
      mockDb.users.unshift(record)
      return ok(record, config)
    }

    if (url?.startsWith('/system/users/') && lowerMethod === 'put') {
      const id = Number(url.split('/').pop())
      const index = mockDb.users.findIndex((item) => item.id === id)
      if (index < 0) {
        return fail(config, '用户不存在', 404)
      }
      const body = parseBody<Partial<UserSummary>>(config)
      mockDb.users[index] = { ...mockDb.users[index], ...body }
      return ok(mockDb.users[index], config)
    }

    if (url?.startsWith('/system/users/') && lowerMethod === 'delete') {
      const id = Number(url.split('/').pop())
      mockDb.users = mockDb.users.filter((item) => item.id !== id)
      return ok(true, config)
    }

    if (url === '/system/roles' && lowerMethod === 'get') {
      let list = [...mockDb.roles]
      list = matchKeyword(list, query.keyword)
      if (query.status) {
        list = list.filter((item) => item.status === query.status)
      }
      return ok(paginate(list, query), config)
    }

    if (url === '/system/roles' && lowerMethod === 'post') {
      const body = parseBody<Partial<RoleRecord>>(config)
      const record: RoleRecord = {
        id: nextId(mockDb.roles),
        name: body.name ?? '',
        code: body.code ?? `role_${Date.now()}`,
        status: body.status ?? 'enabled',
        description: body.description ?? '',
        menuIds: body.menuIds ?? [],
        permissions: body.permissions ?? [],
        createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      }
      mockDb.roles.unshift(record)
      return ok(record, config)
    }

    if (url?.startsWith('/system/roles/') && url.endsWith('/assign') && lowerMethod === 'put') {
      const roleParts = url.split('/')
      const roleId = Number(roleParts[roleParts.length - 2])
      const role = mockDb.roles.find((item) => item.id === roleId)
      if (!role) {
        return fail(config, '角色不存在', 404)
      }
      const body = parseBody<{ menuIds: number[]; permissions: string[] }>(config)
      role.menuIds = body.menuIds
      role.permissions = body.permissions
      return ok(role, config)
    }

    if (url?.startsWith('/system/roles/') && lowerMethod === 'put') {
      const id = Number(url.split('/').pop())
      const role = mockDb.roles.find((item) => item.id === id)
      if (!role) {
        return fail(config, '角色不存在', 404)
      }
      Object.assign(role, parseBody<Partial<RoleRecord>>(config))
      return ok(role, config)
    }

    if (url?.startsWith('/system/roles/') && lowerMethod === 'delete') {
      const id = Number(url.split('/').pop())
      mockDb.roles = mockDb.roles.filter((item) => item.id !== id)
      return ok(true, config)
    }

    if (url === '/system/menus' && lowerMethod === 'get') {
      return ok(mockDb.menus.sort((a, b) => a.sort - b.sort), config)
    }

    if (url === '/system/menus' && lowerMethod === 'post') {
      const body = parseBody<Partial<MenuRecord>>(config)
      const record: MenuRecord = {
        id: nextId(mockDb.menus),
        parentId: body.parentId ?? null,
        type: body.type ?? 'menu',
        title: body.title ?? '',
        titleKey: body.titleKey ?? '',
        path: body.path ?? '',
        icon: body.icon,
        component: body.component,
        permission: body.permission,
        hidden: body.hidden ?? false,
        keepAlive: body.keepAlive ?? false,
        sort: body.sort ?? 99,
        status: body.status ?? 'enabled',
      }
      mockDb.menus.push(record)
      return ok(record, config)
    }

    if (url?.startsWith('/system/menus/') && lowerMethod === 'put') {
      const id = Number(url.split('/').pop())
      const menu = mockDb.menus.find((item) => item.id === id)
      if (!menu) {
        return fail(config, '菜单不存在', 404)
      }
      Object.assign(menu, parseBody<Partial<MenuRecord>>(config))
      return ok(menu, config)
    }

    if (url?.startsWith('/system/menus/') && lowerMethod === 'delete') {
      const id = Number(url.split('/').pop())
      mockDb.menus = mockDb.menus.filter((item) => item.id !== id && item.parentId !== id)
      return ok(true, config)
    }

    if (url === '/system/dict-types' && lowerMethod === 'get') {
      let list = matchKeyword([...mockDb.dictTypes], query.keyword)
      if (query.status) {
        list = list.filter((item) => item.status === query.status)
      }
      return ok(paginate(list, query), config)
    }

    if (url === '/system/dict-types' && lowerMethod === 'post') {
      const body = parseBody<Partial<DictTypeRecord>>(config)
      const record: DictTypeRecord = {
        id: nextId(mockDb.dictTypes),
        name: body.name ?? '',
        code: body.code ?? '',
        status: body.status ?? 'enabled',
        description: body.description ?? '',
        createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      }
      mockDb.dictTypes.push(record)
      return ok(record, config)
    }

    if (url?.startsWith('/system/dict-types/') && lowerMethod === 'put') {
      const id = Number(url.split('/').pop())
      const record = mockDb.dictTypes.find((item) => item.id === id)
      if (!record) {
        return fail(config, '字典类型不存在', 404)
      }
      Object.assign(record, parseBody<Partial<DictTypeRecord>>(config))
      return ok(record, config)
    }

    if (url?.startsWith('/system/dict-types/') && lowerMethod === 'delete') {
      const id = Number(url.split('/').pop())
      const record = mockDb.dictTypes.find((item) => item.id === id)
      if (!record) {
        return fail(config, '字典类型不存在', 404)
      }
      mockDb.dictItems = mockDb.dictItems.filter((item) => item.typeCode !== record.code)
      mockDb.dictTypes = mockDb.dictTypes.filter((item) => item.id !== id)
      return ok(true, config)
    }

    if (url?.includes('/system/dict-types/') && url.endsWith('/items') && lowerMethod === 'get') {
      const dictParts = url.split('/')
      const typeCode = dictParts[dictParts.length - 2] ?? ''
      const list = mockDb.dictItems.filter((item) => item.typeCode === typeCode).sort((a, b) => a.sort - b.sort)
      return ok(list, config)
    }

    if (url === '/system/dict-items' && lowerMethod === 'post') {
      const body = parseBody<Partial<DictItemRecord>>(config)
      const record: DictItemRecord = {
        id: nextId(mockDb.dictItems),
        typeCode: body.typeCode ?? '',
        label: body.label ?? '',
        value: body.value ?? '',
        sort: body.sort ?? 1,
        status: body.status ?? 'enabled',
        remark: body.remark ?? '',
      }
      mockDb.dictItems.push(record)
      return ok(record, config)
    }

    if (url?.startsWith('/system/dict-items/') && lowerMethod === 'put') {
      const id = Number(url.split('/').pop())
      const record = mockDb.dictItems.find((item) => item.id === id)
      if (!record) {
        return fail(config, '字典项不存在', 404)
      }
      Object.assign(record, parseBody<Partial<DictItemRecord>>(config))
      return ok(record, config)
    }

    if (url?.startsWith('/system/dict-items/') && lowerMethod === 'delete') {
      const id = Number(url.split('/').pop())
      mockDb.dictItems = mockDb.dictItems.filter((item) => item.id !== id)
      return ok(true, config)
    }

    if (url === '/system/logs/operation' && lowerMethod === 'get') {
      const list = matchKeyword([...mockDb.operationLogs], query.keyword)
      return ok(paginate(list, query), config)
    }

    if (url === '/system/logs/login' && lowerMethod === 'get') {
      const list = matchKeyword([...mockDb.loginLogs], query.keyword)
      return ok(paginate(list, query), config)
    }

    if (url === '/system/configs' && lowerMethod === 'get') {
      let list = matchKeyword([...mockDb.configs], query.keyword)
      if (query.group) {
        list = list.filter((item) => item.group === query.group)
      }
      return ok(paginate(list, query), config)
    }

    if (url === '/system/configs' && lowerMethod === 'post') {
      const body = parseBody<Partial<SystemConfigRecord>>(config)
      const record: SystemConfigRecord = {
        id: nextId(mockDb.configs),
        group: body.group ?? 'app',
        key: body.key ?? '',
        name: body.name ?? '',
        type: body.type ?? 'string',
        value: body.value ?? '',
        options: body.options,
        description: body.description ?? '',
        status: body.status ?? 'enabled',
      }
      mockDb.configs.push(record)
      return ok(record, config)
    }

    if (url?.startsWith('/system/configs/') && lowerMethod === 'put') {
      const id = Number(url.split('/').pop())
      const record = mockDb.configs.find((item) => item.id === id)
      if (!record) {
        return fail(config, '配置不存在', 404)
      }
      Object.assign(record, parseBody<Partial<SystemConfigRecord>>(config))
      return ok(record, config)
    }

    if (url?.startsWith('/system/configs/') && lowerMethod === 'delete') {
      const id = Number(url.split('/').pop())
      mockDb.configs = mockDb.configs.filter((item) => item.id !== id)
      return ok(true, config)
    }

    return fail(config, `未实现的 mock 接口: ${lowerMethod.toUpperCase()} ${url}`, 404)
  }
}
