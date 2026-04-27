# TM Admin Template

基于 `Vue 3 + Vite + TypeScript + TailwindCSS + tm-ui` 的后台管理模板，内置：

- 账号密码登录、token 持久化、路由守卫
- 静态路由 + 菜单过滤 + 按钮级权限控制
- `Pinia` 全局状态管理
- `axios` 请求层和 mock 适配器
- 中英文切换、主题切换、多标签页、全局搜索、面包屑、异常页
- 用户 / 角色 / 菜单 / 字典 / 日志 / 系统配置模块示例

## 目录

```text
apps/admin/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── src
    ├── api
    ├── components
    ├── config
    ├── directives
    ├── i18n
    ├── layouts
    ├── mock
    ├── router
    ├── stores
    ├── styles
    ├── types
    ├── utils
    └── views
```

## 开发命令

```bash
pnpm admin:dev
pnpm admin:build
```

默认开发端口是 `3002`。

## Mock 模式

通过环境变量控制：

```bash
VITE_USE_MOCK=true
```

- `true`: 使用 `src/mock/server.ts` 中的本地 mock 适配器
- `false`: 走真实 `axios` 请求

当前示例账号：

- `admin / 123456`
- `editor / 123456`
- `auditor / 123456`

## 后端接入

1. 将 `VITE_USE_MOCK=false`
2. 保留 `src/api/http.ts` 中的统一响应拦截器
3. 将 `baseURL` 改为真实后端地址
4. 按模块替换 `src/api/system.ts` 和 `src/api/auth.ts` 的接口实现
5. 保持响应结构 `{ code, message, data }`，这样页面层无需改动

## 权限模型

- 页面权限：在 `src/router/routes.ts` 里通过 `meta.permission` 配置
- 菜单权限：同样由路由 `meta.permission` 和当前用户权限集共同决定
- 按钮权限：使用 `v-permission` 或 `PermissionButton`

示例：

```vue
<PermissionButton permission="system:user:create" type="primary">
  新建用户
</PermissionButton>
```

```vue
<tm-button v-permission="'system:user:delete'" danger>
  删除
</tm-button>
```

## 新增页面

1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/routes.ts` 增加静态路由
3. 为路由补充 `meta.title`、`meta.icon`、`meta.permission`
4. 如果需要按钮控制，在页面中使用权限码
5. 如果页面要进菜单，不要设置 `meta.hidden`

## 新增菜单和权限码

1. 在 `src/router/routes.ts` 中增加页面路由
2. 在 `src/mock/db.ts` 中补充菜单数据和角色权限数据
3. 在对应页面按钮上使用新的权限码
4. 如果接入真实后端，把权限码同步到服务端权限配置

## 国际化

- 文案入口：`src/i18n/messages.ts`
- 当前提供 `zh-CN` 和 `en-US`
- 新增页面时，优先把标题、按钮文案、提示文案收敛到语言包

## 主题

- 默认主题：`default`
- 扩展主题：`ocean`
- 主题变量在 `src/styles/index.css`

## 复用建议

- 业务项目可以直接复制 `apps/admin` 作为基础后台工程
- 如果项目继续复用当前组件库，保留 `tm-ui` 别名即可
- 如果拆到独立仓库，建议把 `tm-ui` 改为正式 npm 包或工作区依赖
