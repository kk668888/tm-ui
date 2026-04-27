# PRD: TM-UI 后台管理模板 / 脚手架

## 1. Introduction

在当前 `tm-ui` 项目下新增一套可复用的后台管理系统模板，作为多个业务项目的后台前端脚手架基础。该模板基于 `Vue 3 + Vite + TypeScript + TailwindCSS + tm-ui` 构建，提供完整的后台骨架、登录鉴权、菜单导航、用户与角色管理、字典管理、日志管理、系统配置、多语言、主题切换以及权限控制能力。

第一版不实现真实后端，而是提供明确的接口约定、统一的 `axios` 请求封装、完整的 `mock` 数据方案，以及预留真实后端接入层。这样既能快速用于前端开发和演示，也能在后续业务项目中低成本替换为真实接口。

## 2. Goals

- 提供一套可复用的后台管理模板，支持多个项目快速起步
- 建立统一的后台前端工程结构、状态管理、接口层和权限模型
- 覆盖常见后台核心模块：登录、用户、角色、菜单、字典、日志、系统配置
- 实现账号密码登录、token 持久化、路由守卫、按钮级权限控制
- 支持中英文切换、主题切换、多标签页、全局搜索、面包屑、异常页
- 使用 `Pinia + axios + mock` 提供可独立运行的前端开发体验
- 尽可能复用 `tm-ui` 现有组件与设计规范，验证其在后台场景的适配能力

## 3. User Stories

### US-001: 初始化后台模板应用骨架
**Description:** As a 开发者, I want 一个清晰的后台项目骨架 so that 后续模块可以按统一约定扩展。

**Acceptance Criteria:**
- [ ] 在当前仓库内新增独立后台应用目录，命名和结构清晰
- [ ] 集成 `Vue 3`、`Vite`、`TypeScript`、`TailwindCSS`、`tm-ui`
- [ ] 建立基础目录结构：`api`、`router`、`store`、`layouts`、`views`、`components`、`locales`、`mock`
- [ ] 提供基础布局壳组件，包含侧边栏、顶栏、内容区
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: 建立应用级路由与布局体系
**Description:** As a 用户, I want 统一的后台页面框架和导航结构 so that 我能稳定地在各模块间切换。

**Acceptance Criteria:**
- [ ] 配置静态路由体系，包含登录页、首页、系统管理、异常页等基础页面
- [ ] 提供至少一种主后台布局和一种空白布局
- [ ] 路由支持页面标题、图标、是否缓存、是否隐藏菜单等元信息
- [ ] 面包屑根据路由元信息正确渲染
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: 实现登录、token 持久化与路由守卫
**Description:** As a 管理员, I want 通过账号密码登录并保持会话 so that 我不用重复登录且未授权用户无法访问后台。

**Acceptance Criteria:**
- [ ] 提供账号密码登录页和登录表单校验
- [ ] 登录成功后将 token 持久化到本地存储
- [ ] 刷新页面后可恢复登录状态
- [ ] 未登录访问受保护页面时自动跳转到登录页
- [ ] 已登录访问登录页时自动跳转到首页
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: 建立用户状态与应用全局状态管理
**Description:** As a 开发者, I want 使用 Pinia 管理核心状态 so that 登录态、主题、标签页和语言切换可以统一维护。

**Acceptance Criteria:**
- [ ] 建立至少以下 Pinia store：用户、权限、应用设置、多标签页
- [ ] store 支持必要状态持久化
- [ ] 提供统一的 store 初始化和重置机制
- [ ] 退出登录时清理用户态、权限态和缓存标签页
- [ ] Typecheck passes

### US-005: 封装 axios 请求层与接口约定
**Description:** As a 开发者, I want 一个统一的请求层 so that 后续接入真实后端时改动范围可控。

**Acceptance Criteria:**
- [ ] 封装统一的 `axios` 实例，支持 baseURL、超时、请求头注入
- [ ] 配置请求拦截器和响应拦截器
- [ ] 统一处理 token 注入、通用错误提示和 401 失效逻辑
- [ ] 为用户、角色、菜单、字典、日志、系统配置模块定义接口类型和调用方法
- [ ] `mock` 与真实接口切换方式明确
- [ ] Typecheck passes

### US-006: 建立 mock 数据与模拟接口层
**Description:** As a 前端开发者, I want 在没有真实后端的情况下完成联调 so that 模板可以独立运行和演示。

**Acceptance Criteria:**
- [ ] 提供登录、当前用户、用户列表、角色列表、菜单树、字典、日志、系统配置的 mock 接口
- [ ] mock 数据具备基础分页、筛选、详情、创建、编辑、删除交互
- [ ] mock 返回结构与接口约定一致
- [ ] 可通过环境变量或配置切换 mock 模式
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: 实现菜单渲染与权限模型
**Description:** As a 管理员, I want 基于静态路由和权限标识控制界面可见性 so that 不同角色只能看到允许的功能。

**Acceptance Criteria:**
- [ ] 侧边栏菜单基于静态路由配置渲染
- [ ] 支持根据角色或权限码过滤可展示菜单
- [ ] 路由守卫可校验页面访问权限
- [ ] 无权限访问页面时跳转到 403 异常页
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: 实现按钮级权限控制能力
**Description:** As a 开发者, I want 用指令或组件控制按钮显示 so that 页面操作权限可以细粒度复用。

**Acceptance Criteria:**
- [ ] 提供权限指令或权限包装组件
- [ ] 支持单个权限码和多个权限码组合判断
- [ ] 无权限时默认隐藏按钮，行为可配置为禁用
- [ ] 在用户管理或角色管理页面提供实际使用示例
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: 实现后台首页与全局增强体验
**Description:** As a 用户, I want 具备完整后台交互增强能力 so that 日常操作更高效。

**Acceptance Criteria:**
- [ ] 提供首页仪表盘示例页面
- [ ] 支持多标签页导航和标签关闭/刷新
- [ ] 支持全局搜索已注册菜单或页面
- [ ] 顶栏展示面包屑、主题切换、语言切换、用户下拉菜单
- [ ] 提供 403、404、500 异常页
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: 实现用户管理模块
**Description:** As a 管理员, I want 管理后台用户 so that 我可以维护账号、状态和基础资料。

**Acceptance Criteria:**
- [ ] 提供用户列表页，支持分页、关键词筛选、状态筛选
- [ ] 支持新增、编辑、删除、启用/禁用用户
- [ ] 支持查看用户详情
- [ ] 表单字段和表格字段具备明确的类型定义
- [ ] 页面按钮接入按钮级权限控制
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-011: 实现角色管理与角色授权模块
**Description:** As a 管理员, I want 管理角色及其权限 so that 后台权限可以按角色复用。

**Acceptance Criteria:**
- [ ] 提供角色列表页和角色表单
- [ ] 支持角色新增、编辑、删除、启用/禁用
- [ ] 支持为角色分配菜单权限和按钮权限
- [ ] 角色权限修改后可正确影响菜单和操作按钮展示
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-012: 实现菜单管理模块
**Description:** As a 管理员, I want 维护菜单和权限标识 so that 后台导航和权限体系可配置。

**Acceptance Criteria:**
- [ ] 提供菜单树列表展示
- [ ] 支持目录、菜单、按钮三种节点类型
- [ ] 支持新增、编辑、删除、排序
- [ ] 支持维护路由路径、组件标识、权限码、图标、缓存等字段
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-013: 实现字典管理模块
**Description:** As a 管理员, I want 维护字典类型和字典项 so that 业务系统可以复用统一枚举数据。

**Acceptance Criteria:**
- [ ] 提供字典类型列表和字典项列表
- [ ] 支持字典类型和字典项的新增、编辑、删除、启用/禁用
- [ ] 支持按字典类型查看关联字典项
- [ ] 提供前端获取字典数据的复用示例
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-014: 实现日志管理模块
**Description:** As a 管理员, I want 查看系统操作日志和登录日志 so that 我能审计后台使用情况。

**Acceptance Criteria:**
- [ ] 提供操作日志列表页
- [ ] 提供登录日志列表页
- [ ] 支持分页、时间范围筛选、关键字筛选
- [ ] 支持查看日志详情
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-015: 实现系统配置模块
**Description:** As a 管理员, I want 维护系统级配置项 so that 模板具备基本的系统参数管理能力。

**Acceptance Criteria:**
- [ ] 提供系统配置列表页
- [ ] 支持新增、编辑、删除、按分组查看配置项
- [ ] 支持布尔、文本、数字、选择项等基础配置类型示例
- [ ] 配置表单和列表具备类型约束
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-016: 实现国际化与主题切换
**Description:** As a 用户, I want 支持中英文和主题切换 so that 模板可以适配不同团队和视觉偏好。

**Acceptance Criteria:**
- [ ] 集成 i18n 方案并提供中文、英文两套文案
- [ ] 登录页、首页、菜单、常用操作文案支持切换
- [ ] 提供主题切换能力，至少支持默认主题和一种扩展主题
- [ ] 主题切换结果可持久化
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-017: 编写模板文档与接入说明
**Description:** As a 使用者, I want 清晰的模板文档 so that 我能快速把它复用到新项目中。

**Acceptance Criteria:**
- [ ] 编写模板使用文档，说明目录结构、开发命令、mock 模式、权限模型和国际化方案
- [ ] 编写后端接入说明，明确替换 mock 的步骤
- [ ] 编写新增页面、新增菜单、新增权限码的操作说明
- [ ] 文档中包含至少一份环境变量示例
- [ ] Typecheck passes

## 4. Functional Requirements

- **FR-1:** 系统必须在当前 `tm-ui` 仓库内以独立后台应用形态存在，不能破坏现有组件库构建流程。
- **FR-2:** 系统必须使用 `Vue 3`、`Vite`、`TypeScript`、`TailwindCSS` 和当前 `tm-ui` 组件库。
- **FR-3:** 系统必须使用 `Pinia` 管理用户态、权限态、应用设置和标签页等核心状态。
- **FR-4:** 系统必须提供统一的 `axios` 请求封装，并预留真实后端切换能力。
- **FR-5:** 系统必须提供 `mock` 数据和模拟接口，使模板在无真实后端时可完整运行。
- **FR-6:** 登录鉴权必须支持账号密码登录、token 持久化和路由守卫。
- **FR-7:** 路由体系必须以前端静态路由为主，并通过权限标识控制页面访问。
- **FR-8:** 系统必须支持按钮级权限控制，且可通过指令或组件在页面中复用。
- **FR-9:** 模板必须包含用户、角色、菜单、字典、日志、系统配置六类核心模块。
- **FR-10:** 系统必须支持多标签页、全局搜索、面包屑、异常页。
- **FR-11:** 系统必须支持中英文切换，且基础页面文案完整覆盖。
- **FR-12:** 系统必须支持主题切换，并将用户选择持久化。
- **FR-13:** 页面表单、表格、详情页应优先复用 `tm-ui` 组件或基于其二次封装。
- **FR-14:** 模板必须提供清晰的目录规范、接口规范和扩展说明，便于复用到多个项目。

## 5. Non-Goals

- 第一版不实现真实后端服务、数据库、JWT 刷新机制和服务端权限计算
- 第一版不实现动态路由下发，路由由前端静态维护
- 第一版不实现多租户、组织架构、部门树、岗位管理等复杂组织模型
- 第一版不实现 WebSocket、实时通知、审批流、报表设计器等高级业务能力
- 第一版不要求兼容移动端后台体验，优先桌面端
- 第一版不追求完整低代码能力，只提供通用后台模板基础设施

## 6. Design Considerations

- 后台界面应保持中后台产品风格，强调清晰的信息层级和高密度操作效率
- 顶层布局建议包含：左侧导航、顶部工具栏、面包屑区域、可切换标签页、主内容区
- 通用列表页应复用同一套“查询表单 + 操作栏 + 表格 + 分页”页面模式
- 表单弹窗、抽屉、详情面板应统一交互规范，减少不同模块的使用差异
- 权限控制在 UI 上既要保证可复用，也要避免页面内大量重复判断逻辑
- 国际化文案应按模块拆分，避免所有语言包堆在单一文件中

## 7. Technical Considerations

- 建议将后台模板作为当前仓库内的独立应用目录，例如 `apps/admin` 或 `play/admin`
- 建议抽出统一配置层：环境变量、请求层、权限工具、路由元信息类型、全局常量
- 建议定义统一响应结构，例如 `{ code, message, data }`，避免后续切真实接口时大面积重构
- `mock` 数据建议覆盖分页、筛选、增删改查、权限码返回、用户信息返回等高频场景
- `tm-ui` 若有后台场景缺失的复合组件，可在后台模板内先做业务级封装，再沉淀回组件库
- 需要明确后台应用与组件库主包构建的边界，避免后台代码进入组件库发布产物

## 8. Success Metrics

- 新项目可基于该模板在 1 天内完成初始化并开始业务开发
- 在无真实后端的前提下，模板可完整演示登录、导航、权限与核心管理模块
- 新增一个标准后台模块时，开发者只需复用既有页面模式和请求约定即可完成
- 中英文切换、主题切换、多标签页、权限控制在主要页面中无明显功能缺失
- 模板结构对新接手开发者清晰，可在短时间内定位页面、接口、权限和状态代码

## 9. Open Questions

- 后台模板最终目录应采用 `apps/admin`、`admin/` 还是其他结构？
- `mock` 方案采用哪种具体实现更合适，例如 `vite-plugin-mock` 或本地模块拦截？
- 主题切换第一版是仅支持浅色系主题 token 切换，还是同时预留暗色主题？
- 全局搜索是只搜索菜单入口，还是同时覆盖页面内操作入口？
- 是否需要在第一版中加入基础单元测试和 E2E 测试脚手架？
