import type { RouteRecordRaw } from 'vue-router'
import BlankLayout from '@admin/layouts/BlankLayout.vue'
import AdminLayout from '@admin/layouts/AdminLayout.vue'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: BlankLayout,
    meta: { title: 'auth.signIn', public: true, hidden: true },
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@admin/views/auth/LoginView.vue'),
        meta: { title: 'auth.signIn', public: true, hidden: true },
      },
    ],
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    meta: { title: 'common.appName' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@admin/views/dashboard/DashboardView.vue'),
        meta: { title: 'menu.dashboard', icon: 'DashboardOutlined', affix: true, keepAlive: true },
      },
      {
        path: 'system',
        name: 'System',
        redirect: '/system/users',
        meta: { title: 'menu.system', icon: 'AppstoreOutlined' },
        children: [
          {
            path: 'users',
            name: 'SystemUsers',
            component: () => import('@admin/views/system/users/UserListView.vue'),
            meta: { title: 'menu.users', icon: 'TeamOutlined', keepAlive: true, permission: 'system:user:view' },
          },
          {
            path: 'roles',
            name: 'SystemRoles',
            component: () => import('@admin/views/system/roles/RoleListView.vue'),
            meta: { title: 'menu.roles', icon: 'SafetyOutlined', keepAlive: true, permission: 'system:role:view' },
          },
          {
            path: 'menus',
            name: 'SystemMenus',
            component: () => import('@admin/views/system/menus/MenuListView.vue'),
            meta: { title: 'menu.menus', icon: 'MenuOutlined', keepAlive: true, permission: 'system:menu:view' },
          },
          {
            path: 'dicts',
            name: 'SystemDicts',
            component: () => import('@admin/views/system/dicts/DictManageView.vue'),
            meta: { title: 'menu.dicts', icon: 'BookOutlined', keepAlive: true, permission: 'system:dict:view' },
          },
          {
            path: 'logs/operation',
            name: 'OperationLogs',
            component: () => import('@admin/views/system/logs/OperationLogView.vue'),
            meta: { title: 'menu.operationLogs', icon: 'FileSearchOutlined', permission: 'system:log:operation' },
          },
          {
            path: 'logs/login',
            name: 'LoginLogs',
            component: () => import('@admin/views/system/logs/LoginLogView.vue'),
            meta: { title: 'menu.loginLogs', icon: 'FileDoneOutlined', permission: 'system:log:login' },
          },
          {
            path: 'configs',
            name: 'SystemConfigs',
            component: () => import('@admin/views/system/configs/SystemConfigView.vue'),
            meta: { title: 'menu.configs', icon: 'SettingOutlined', keepAlive: true, permission: 'system:config:view' },
          },
        ],
      },
      {
        path: '403',
        name: 'Forbidden',
        component: () => import('@admin/views/exceptions/ForbiddenView.vue'),
        meta: { title: 'menu.exceptions403', hidden: true },
      },
      {
        path: '500',
        name: 'ServerError',
        component: () => import('@admin/views/exceptions/ServerErrorView.vue'),
        meta: { title: '500', hidden: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: BlankLayout,
    meta: { title: 'menu.exceptions404', hidden: true },
    children: [
      {
        path: '',
        name: 'NotFound',
        component: () => import('@admin/views/exceptions/NotFoundView.vue'),
        meta: { title: 'menu.exceptions404', hidden: true },
      },
    ],
  },
]
