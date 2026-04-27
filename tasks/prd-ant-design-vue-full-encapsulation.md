# PRD: Ant Design Vue 全量二次封装

## 1. Introduction

将 ant-design-vue 所有组件以 `Tm` 前缀进行二次封装，构建完整的 tm-ui 组件库。每个组件采用"透传+增强默认值"策略——保留 ant-design-vue 的全部 API，同时提供更友好的默认样式、默认行为和中文默认文案。

现有项目已封装 5 个基础组件（TmButton、TmInput、TmSelect、TmTable、TmForm），本项目将扩展至 ant-design-vue 全量 80+ 组件，分四批次递进完成。

## 2. Goals

- 完成 ant-design-vue 全量组件的 `Tm` 前缀封装
- 每个组件保留原始组件全部 props、events、slots 的透传能力
- 提供更符合中文场景的默认值（placeholder、空状态、分页文案等）
- 统一视觉风格（border-radius、transition、hover 态）
- 集成 TailwindCSS 作为组件内辅助样式方案
- 每个组件配套独立 Markdown 文档（示例 + API 表格）
- 核心组件配备单元测试（Vitest），覆盖率 80%+
- 组件目录结构清晰、可读性强，非传统平铺式命名

## 3. User Stories

### US-001: 配置 TailwindCSS 集成
**Description:** As a 开发者, I want 在组件库中集成 TailwindCSS so that 组件可以使用原子化类名实现样式。

**Acceptance Criteria:**
- [ ] 安装 tailwindcss + postcss + autoprefixer 依赖
- [ ] 配置 tailwind.config.js，启用 content 扫描 `src/**/*.{vue,ts}`
- [ ] 在 vite.config.ts 中集成 tailwindcss
- [ ] 新建一个测试组件验证 TailwindCSS 在 scoped style 中生效
- [ ] Typecheck 通过
- [ ] Verify in browser using dev-browser skill

### US-002: 重构组件目录结构
**Description:** As a 开发者, I want 更清晰的组件目录结构 so that 快速定位组件的实现、类型、测试和文档。

**Acceptance Criteria:**
- [ ] 每个组件采用以下目录模板：
  ```
  src/components/tm-button/
    ├── component.ts      # withInstall 导出入口
    ├── TmButton.vue      # 组件实现
    ├── types.ts          # 类型定义
    ├── style.less        # 样式定义
    └── __tests__/        # 单元测试（核心组件）
        └── TmButton.test.ts
  ```
- [ ] 所有现有组件从 `TmButton/` 风格迁移到 `tm-button/` 风格
- [ ] `src/components/index.ts` 更新所有导出路径
- [ ] Typecheck 通过

### US-003: 建立通用组件基类/混入
**Description:** As a 开发者, I want 提取透传+增强模式的通用逻辑 so that 新增组件时减少重复代码。

**Acceptance Criteria:**
- [ ] 创建 `src/utils/forward-attrs.ts` 工具函数（自动剥离 class/style）
- [ ] 创建 `src/utils/forward-slots.ts` 工具函数（动态槽透传）
- [ ] TmInput、TmSelect、TmTable 等已有组件重构使用工具函数
- [ ] 重构后行为不变（playground 验证无回归）
- [ ] Typecheck 通过

### US-004: 第一批 - 基础输入组件封装（Button、Input、Textarea、InputNumber、InputPassword）
**Description:** As a 开发者, I want 封装常用输入基础组件 so that 项目开箱即用。

**Acceptance Criteria:**
- [ ] 每个组件按新目录结构创建
- [ ] 透传 ant-design-vue 全部 props/events/slots
- [ ] 增强默认值（placeholder 中文、默认圆角等）
- [ ] TailwindCSS 辅助样式应用（如间距、布局辅助类）
- [ ] 每个组件配套独立 .md 文档
- [ ] Typecheck 通过

### US-005: 第一批 - 表单组件封装（Form、FormItem、Checkbox、Radio、Switch、DatePicker、TimePicker、Upload）
**Description:** As a 开发者, I want 封装表单相关组件 so that 构建复杂表单更高效。

**Acceptance Criteria:**
- [ ] TmForm 增强 schema 类型，补充更多 field type 支持
- [ ] 每个子组件透传 + 增强默认值
- [ ] Checkbox/Radio 增强默认间距和布局
- [ ] Upload 增强中文文案
- [ ] 独立 .md 文档
- [ ] Typecheck 通过

### US-006: 第一批 - 数据展示组件（Table、List、Tree、TreeSelect、Transfer、Avatar、Badge、Card、Collapse、Descriptions、Empty、Image、Popover、Tooltip）
**Description:** As a 开发者, I want 封装数据展示组件 so that 数据驱动 UI 场景全覆盖。

**Acceptance Criteria:**
- [ ] TmTable 已有，验证是否符合新目录结构
- [ ] Tree/TreeSelect 增强中文搜索 placeholder
- [ ] Transfer 增强左右列表中文标题
- [ ] Empty 统一空状态默认文案
- [ ] Tooltip/Popover 增强默认触发延迟
- [ ] 独立 .md 文档
- [ ] Typecheck 通过

### US-007: 第一批 - 反馈组件（Alert、Message、Modal、Notification、Popconfirm、Progress、Result、Spin、Drawer）
**Description:** As a 开发者, I want 封装用户反馈组件 so that 交互反馈场景全覆盖。

**Acceptance Criteria:**
- [ ] Modal/Drawer 增强默认关闭确认行为
- [ ] Message/Notification 增强默认中文文案
- [ ] Spin 增强默认居中行为
- [ ] Progress 增强默认颜色主题
- [ ] 独立 .md 文档
- [ ] Typecheck 通过

### US-008: 第一批 - 导航组件（Breadcrumb、Dropdown、Menu、Pagination、Steps、Tabs）
**Description:** As a 开发者, I want 封装导航组件 so that 页面导航场景全覆盖。

**Acceptance Criteria:**
- [ ] Pagination 增强中文文案（已由 TmTable 部分覆盖）
- [ ] Menu 增强默认选中态样式
- [ ] Breadcrumb 增强分隔符默认值
- [ ] Steps 增强默认图标和文案
- [ ] 独立 .md 文档
- [ ] Typecheck 通过

### US-009: 第一批核心组件编写单元测试
**Description:** As a 开发者, I want 核心组件有单元测试 so that 重构和升级时有回归保障。

**Acceptance Criteria:**
- [ ] 安装 Vitest + @vue/test-utils
- [ ] 为以下核心组件编写测试：TmButton、TmInput、TmSelect、TmTable、TmForm、TmModal
- [ ] 每个核心组件测试覆盖率 >= 80%
- [ ] 测试包含：渲染测试、props 测试、events 测试、slots 测试
- [ ] `npm run test` 全部通过

### US-010: 第二批 - 布局组件（Grid、Layout、Space、Divider、FloatButton、Affix、Anchor）
**Description:** As a 开发者, I want 封装布局组件 so that 页面布局场景全覆盖。

**Acceptance Criteria:**
- [ ] Grid/Space 增强默认间距和对齐
- [ ] Layout 增强默认背景色和过渡
- [ ] Affix 增强默认 offset 行为
- [ ] 独立 .md 文档
- [ ] Typecheck 通过

### US-011: 第二批 - 数据录入补充（Cascader、Rate、Slider、ColorPicker、Mentions、AutoComplete、Segmented）
**Description:** As a 开发者, I want 补充数据录入组件 so that 复杂表单场景无死角。

**Acceptance Criteria:**
- [ ] Cascader 增强中文搜索 placeholder
- [ ] Rate 增强默认星数和颜色
- [ ] Slider 增强默认步长和标记
- [ ] Mentions 增强中文选项
- [ ] 独立 .md 文档
- [ ] Typecheck 通过

### US-012: 第二批 - 其他组件（Typography、Tag、Timeline、Skeleton、Statistic、Carousel、Comment、QRCode、Watermark）
**Description:** As a 开发者, I want 封装剩余展示组件 so that 组件库功能完整。

**Acceptance Criteria:**
- [ ] Typography 增强默认排版样式
- [ ] Timeline 增强默认轴线颜色
- [ ] Skeleton 增强默认动画效果
- [ ] 其余组件按透传+增强模式封装
- [ ] 独立 .md 文档
- [ ] Typecheck 通过

### US-013: 第三批 - 配置组件（ConfigProvider、App）
**Description:** As a 开发者, I want 封装 ant-design-vue 配置组件 so that 全局主题和上下文管理更统一。

**Acceptance Criteria:**
- [ ] TmConfigProvider 透传 ConfigProvider 全部能力
- [ ] 提供默认中文 locale 配置
- [ ] 提供 tm-ui 默认主题 token
- [ ] 独立 .md 文档
- [ ] Typecheck 通过

### US-014: 自动成组件文档
**Description:** As a 文档维护者, I want 自动生成组件 API 文档 so that 不用手动维护每个组件的 props/events/slots 表格。

**Acceptance Criteria:**
- [ ] 创建文档生成脚本（读取 .vue 文件的 props/emits 定义）
- [ ] 每个组件 .md 包含自动生成的 API 表格
- [ ] 示例代码区手动编写
- [ ] 运行生成脚本验证输出
- [ ] VitePress 构建通过

### US-015: 更新 playground 和文档站点
**Description:** As a 使用者, I want 在 playground 中看到所有新组件的示例 so that 快速了解组件能力。

**Acceptance Criteria:**
- [ ] play/src/App.vue 更新，展示所有新增组件
- [ ] docs/.vitepress/config.ts 更新侧边栏
- [ ] 每个组件在 docs/components/ 下有独立 .md
- [ ] VitePress 站点构建和预览正常
- [ ] Verify in browser using dev-browser skill

### US-016: 更新构建配置和发布流程
**Description:** As a 维护者, I want 更新构建配置以支持新增组件和 TailwindCSS so that 产出正确的大小优化后的包。

**Acceptance Criteria:**
- [ ] vite.config.ts 确认 TailwindCSS 产物正确打包
- [ ] 确认 tree-shaking 对未使用组件生效
- [ ] 构建产物大小在合理范围内（全量 < 500KB gzip）
- [ ] `npm run build` 成功
- [ ] TypeScript 类型声明完整

## 4. Functional Requirements

- **FR-1:** 所有组件采用 `inheritAttrs: false` + `v-bind="forwardedAttrs"` 透传模式
- **FR-2:** `forwardedAttrs` 需自动剥离 `class` 和 `style`（通过工具函数统一处理）
- **FR-3:** 所有组件支持动态槽透传（`v-for="(_, name) in $slots"`）
- **FR-4:** 每个组件采用 `tm-xxx` 目录结构（小写 + 连字符）
- **FR-5:** 组件入口文件为 `component.ts`，使用 `withInstall` 包装导出
- **FR-6:** 所有涉及中文文案的默认值使用中文（"请输入"、"请选择"、"暂无数据" 等）
- **FR-7:** TailwindCSS 作为辅助样式方案，可用于组件模板中的 class
- **FR-8:** 核心组件（Button、Input、Select、Table、Form、Modal）必须配备单元测试
- **FR-9:** 每个组件在 `docs/components/` 下有独立 .md 文档
- **FR-10:** 组件按四批次递进发布：第一批（基础+表单+数据展示+反馈+导航）、第二批（布局+数据录入补充+其他）、第三批（配置组件）、第四批（文档完善+优化）

## 5. Non-Goals（不在范围内）

- 不重新设计 ant-design-vue 的组件 API（不破坏原有接口）
- 不实现 ant-design-vue 没有的功能（只做封装，不做功能创新）
- 不包含图标库封装（使用 ant-design-vue 原有图标方案）
- 不做移动端适配（保持桌面端优先）
- 不做暗色主题独立实现（依赖 ant-design-vue 的 ConfigProvider）
- 不对所有组件写测试（仅核心组件有测试覆盖）

## 6. Design Considerations

### 组件目录模板

```
src/components/
├── tm-button/
│   ├── component.ts          # export const TmButton = withInstall(TmButtonComp)
│   ├── TmButton.vue          # 组件实现
│   └── __tests__/
│       └── TmButton.test.ts  # 核心组件测试
├── tm-input/
│   ├── component.ts
│   ├── TmInput.vue
│   └── __tests__/
│       └── TmInput.test.ts
├── tm-table/
│   ├── component.ts
│   ├── TmTable.vue
│   └── types.ts              # 类型定义（如有）
├── tm-form/
│   ├── component.ts
│   ├── TmForm.vue
│   └── types.ts
├── tm-select/
│   ├── component.ts
│   ├── TmSelect.vue
├── tm-modal/
│   ├── component.ts
│   └── TmModal.vue
└── ...
```

### 通用组件封装模式

```vue
<!-- 模板模式 -->
<template>
  <div class="tm-xxx-wrapper">
    <a-xxx-component
      v-bind="forwardedAttrs"
      v-model="modelValue"
    >
      <!-- 动态槽透传 -->
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </a-xxx-component>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'TmXxx', inheritAttrs: false })
// ...props, emits, 增强默认值
</script>

<style scoped lang="less">
/* 组件特定样式 */
</style>
```

### TailwindCSS 使用方式

- 在组件模板中使用 Tailwind class（如 `<div class="tm-wrapper flex items-center gap-2">`）
- TailwindCSS 不替代组件 scoped style，而是辅助处理布局、间距、排列等通用样式
- `tailwind.config.js` content 扫描 `src/**/*.{vue,ts}`

### 文档模板

```markdown
# TmButton 按钮

按钮用于触发一个即时操作。

## 何时使用

- 用于表单提交、对话框确认等操作
- 需要视觉层级时

## 代码演示

### 基本用法

\`\`\`vue
<template>
  <TmButton>默认按钮</TmButton>
</template>
\`\`\`

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| ... | 继承 ant-design-vue Button 全部 Props | - | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| ... | 继承 ant-design-vue Button 全部 Events | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |

> TmButton 透传 ant-design-vue Button 的全部 API。
```

## 7. Technical Considerations

- **Vue 3.3+**: 使用 `<script setup>`、`defineOptions`、`generic` SFC 语法
- **ant-design-vue 4.x**: 作为 peer dependency，不做版本降级
- **TailwindCSS 3.x**: 通过 PostCSS 集成，不侵入组件 scoped style
- **Vite 5.x**: 库模式构建，保持 tree-shaking 友好
- **TypeScript**: 保持 `strict: false`（与现有项目一致），但新增类型定义尽量严谨
- **Vitest**: 单元测试框架，配合 @vue/test-utils
- **VitePress**: 文档站点，每个组件独立页面
- **构建产物**: 全量组件打包后 gzip < 500KB 为目标

## 8. 分批计划

### 第一批（核心组件 ~30 个）
| 类别 | 组件 |
|------|------|
| 基础 | Button, Input, Textarea, InputNumber, InputPassword |
| 表单 | Form, FormItem, Checkbox, Radio, Switch, DatePicker, TimePicker, Upload |
| 数据展示 | Table, List, Tree, TreeSelect, Transfer, Avatar, Badge, Card, Collapse, Descriptions, Empty, Image, Popover, Tooltip |
| 反馈 | Alert, Message, Modal, Notification, Popconfirm, Progress, Result, Spin, Drawer |
| 导航 | Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs |

### 第二批（扩展组件 ~25 个）
| 类别 | 组件 |
|------|------|
| 布局 | Grid, Layout, Space, Divider, FloatButton, Affix, Anchor |
| 数据录入补充 | Cascader, Rate, Slider, ColorPicker, Mentions, AutoComplete, Segmented |
| 其他展示 | Typography, Tag, Timeline, Skeleton, Statistic, Carousel, Comment, QRCode, Watermark |

### 第三批（配置组件 ~2 个）
| 类别 | 组件 |
|------|------|
| 配置 | ConfigProvider, App |

### 第四批（收尾）
- 补充遗漏组件
- 文档完善和示例优化
- 构建产物大小优化
- 全量 typecheck 验证

## 9. Success Metrics

- 新增组件后 playground 无回归（所有组件可正常渲染）
- 核心组件测试覆盖率 >= 80%
- 构建产物 gzip 后 < 500KB（全量）
- 每个组件有独立文档和至少一个示例
- Tree-shaking 正常工作（未使用组件不打包进产物）
- 新增组件时编写时间 < 30 分钟/个（得益于通用工具函数）

## 10. Open Questions

1. TailwindCSS 的 theme 配置是否需要同步 ant-design-vue 的 design token（颜色、间距、圆角）？
2. 是否需要提供 `tm-ui/style.css` 和 `tm-ui/style/tailwind.css` 两种引入方式？
3. 组件目录中是否需要增加 `README.md`（除了 docs 下的 .md 文档）？
4. 是否需要提供 CDN 引入方式（umd 构建）？
5. ant-design-vue 5.x 即将发布，封装时是否需要考虑向前兼容？
