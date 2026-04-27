import type {
  DictItemRecord,
  DictTypeRecord,
  LogRecord,
  LoginLogRecord,
  MenuRecord,
  RoleRecord,
  SystemConfigRecord,
  UserProfile,
  UserSummary,
} from '@admin/types'

export const buttonPermissions = [
  'system:user:view',
  'system:user:create',
  'system:user:edit',
  'system:user:delete',
  'system:role:view',
  'system:role:create',
  'system:role:edit',
  'system:role:delete',
  'system:menu:view',
  'system:menu:create',
  'system:menu:edit',
  'system:menu:delete',
  'system:dict:view',
  'system:dict:create',
  'system:dict:edit',
  'system:dict:delete',
  'system:log:operation',
  'system:log:login',
  'system:config:view',
  'system:config:create',
  'system:config:edit',
  'system:config:delete',
]

export const mockDb: {
  tokens: Record<string, number>
  users: UserSummary[]
  roles: RoleRecord[]
  menus: MenuRecord[]
  dictTypes: DictTypeRecord[]
  dictItems: DictItemRecord[]
  operationLogs: LogRecord[]
  loginLogs: LoginLogRecord[]
  configs: SystemConfigRecord[]
} = {
  tokens: {
    'token-admin': 1,
    'token-editor': 2,
    'token-auditor': 3,
  },
  users: [
    {
      id: 1,
      username: 'admin',
      nickname: '超级管理员',
      email: 'admin@tm-ui.local',
      phone: '13800000001',
      status: 'enabled',
      roleCodes: ['super_admin'],
      createdAt: '2026-04-01 09:00',
      lastLoginAt: '2026-04-27 17:30',
    },
    {
      id: 2,
      username: 'editor',
      nickname: '内容管理员',
      email: 'editor@tm-ui.local',
      phone: '13800000002',
      status: 'enabled',
      roleCodes: ['editor'],
      createdAt: '2026-04-05 14:20',
      lastLoginAt: '2026-04-27 10:15',
    },
    {
      id: 3,
      username: 'auditor',
      nickname: '审计员',
      email: 'auditor@tm-ui.local',
      phone: '13800000003',
      status: 'disabled',
      roleCodes: ['auditor'],
      createdAt: '2026-04-11 11:40',
      lastLoginAt: '2026-04-20 08:05',
    },
  ],
  roles: [
    {
      id: 1,
      name: '超级管理员',
      code: 'super_admin',
      status: 'enabled',
      description: '拥有全部权限',
      menuIds: [1, 2, 3, 4, 5, 6, 7],
      permissions: buttonPermissions,
      createdAt: '2026-04-01 09:00',
    },
    {
      id: 2,
      name: '内容管理员',
      code: 'editor',
      status: 'enabled',
      description: '负责内容和配置维护',
      menuIds: [1, 2, 3, 4, 7],
      permissions: [
        'system:user:view',
        'system:user:edit',
        'system:role:view',
        'system:menu:view',
        'system:dict:view',
        'system:dict:create',
        'system:dict:edit',
        'system:config:view',
        'system:config:edit',
      ],
      createdAt: '2026-04-03 12:30',
    },
    {
      id: 3,
      name: '审计员',
      code: 'auditor',
      status: 'enabled',
      description: '仅查看日志和用户信息',
      menuIds: [1, 2, 5, 6],
      permissions: ['system:user:view', 'system:log:operation', 'system:log:login'],
      createdAt: '2026-04-08 16:10',
    },
  ],
  menus: [
    { id: 1, parentId: null, type: 'menu', title: '工作台', titleKey: 'menu.dashboard', path: '/dashboard', icon: 'DashboardOutlined', sort: 1, status: 'enabled' },
    { id: 2, parentId: null, type: 'catalog', title: '系统管理', titleKey: 'menu.system', path: '/system', icon: 'AppstoreOutlined', sort: 2, status: 'enabled' },
    { id: 3, parentId: 2, type: 'menu', title: '用户管理', titleKey: 'menu.users', path: '/system/users', icon: 'TeamOutlined', permission: 'system:user:view', sort: 1, status: 'enabled' },
    { id: 4, parentId: 2, type: 'menu', title: '角色管理', titleKey: 'menu.roles', path: '/system/roles', icon: 'SafetyOutlined', permission: 'system:role:view', sort: 2, status: 'enabled' },
    { id: 5, parentId: 2, type: 'menu', title: '菜单管理', titleKey: 'menu.menus', path: '/system/menus', icon: 'MenuOutlined', permission: 'system:menu:view', sort: 3, status: 'enabled' },
    { id: 6, parentId: 2, type: 'menu', title: '字典管理', titleKey: 'menu.dicts', path: '/system/dicts', icon: 'BookOutlined', permission: 'system:dict:view', sort: 4, status: 'enabled' },
    { id: 7, parentId: 2, type: 'menu', title: '系统配置', titleKey: 'menu.configs', path: '/system/configs', icon: 'SettingOutlined', permission: 'system:config:view', sort: 5, status: 'enabled' },
  ],
  dictTypes: [
    { id: 1, name: '用户状态', code: 'user_status', status: 'enabled', description: '用户启用状态', createdAt: '2026-04-01 10:20' },
    { id: 2, name: '主题类型', code: 'theme_kind', status: 'enabled', description: '后台主题选项', createdAt: '2026-04-06 09:10' },
  ],
  dictItems: [
    { id: 1, typeCode: 'user_status', label: '启用', value: 'enabled', sort: 1, status: 'enabled', remark: '正常可用' },
    { id: 2, typeCode: 'user_status', label: '停用', value: 'disabled', sort: 2, status: 'enabled', remark: '禁止登录' },
    { id: 3, typeCode: 'theme_kind', label: '默认', value: 'default', sort: 1, status: 'enabled', remark: '浅色商务主题' },
    { id: 4, typeCode: 'theme_kind', label: '海洋', value: 'ocean', sort: 2, status: 'enabled', remark: '深蓝海洋主题' },
  ],
  operationLogs: [
    { id: 1, module: '用户管理', action: '更新用户状态', operator: 'admin', ip: '127.0.0.1', status: 'success', createdAt: '2026-04-27 11:30', detail: '将 editor 状态更新为 enabled' },
    { id: 2, module: '字典管理', action: '新增字典项', operator: 'editor', ip: '127.0.0.1', status: 'success', createdAt: '2026-04-26 18:20', detail: '新增 theme_kind 字典项 ocean' },
  ],
  loginLogs: [
    { id: 1, username: 'admin', ip: '127.0.0.1', browser: 'Chrome', os: 'macOS', status: 'success', createdAt: '2026-04-27 17:30', detail: '登录成功' },
    { id: 2, username: 'auditor', ip: '127.0.0.1', browser: 'Edge', os: 'Windows', status: 'failed', createdAt: '2026-04-20 08:05', detail: '账号已停用' },
  ],
  configs: [
    { id: 1, group: 'app', key: 'app.title', name: '系统标题', type: 'string', value: 'TM Admin Template', description: '浏览器标题和首页文案', status: 'enabled' },
    { id: 2, group: 'security', key: 'login.captcha', name: '启用验证码', type: 'boolean', value: false, description: '控制登录页是否显示验证码入口', status: 'enabled' },
    { id: 3, group: 'theme', key: 'theme.default', name: '默认主题', type: 'select', value: 'default', options: [{ label: '默认', value: 'default' }, { label: '海洋', value: 'ocean' }], description: '后台默认主题', status: 'enabled' },
  ],
}

export function buildProfileByUserId(userId: number): UserProfile {
  const user = mockDb.users.find((item) => item.id === userId)
  if (!user) {
    throw new Error('User not found')
  }

  const rolePermissions = mockDb.roles
    .filter((role) => user.roleCodes.includes(role.code))
    .flatMap((role) => role.permissions)

  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    email: user.email,
    avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`,
    roleCodes: user.roleCodes,
    permissions: [...new Set(rolePermissions)],
  }
}
