# TmLayout 布局

组件描述，完整继承 ant-design-vue 的 Layout 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-layout style="min-height: 200px;">
    <tm-layout-header style="background: #001529; color: #fff; padding: 0 16px; line-height: 48px;">Header</tm-layout-header>
    <tm-layout-content style="padding: 16px; background: #f5f5f5;">Content</tm-layout-content>
    <tm-layout-footer style="text-align: center; background: #001529; color: #fff;">Footer</tm-layout-footer>
  </tm-layout>
</div>

```vue
<template>
  <tm-layout style="min-height: 200px;">
    <tm-layout-header style="background: #001529; color: #fff; padding: 0 16px; line-height: 48px;">Header</tm-layout-header>
    <tm-layout-content style="padding: 16px; background: #f5f5f5;">Content</tm-layout-content>
    <tm-layout-footer style="text-align: center; background: #001529; color: #fff;">Footer</tm-layout-footer>
  </tm-layout>
</template>
```

## API

### TmLayout Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| hasSider | 是否包含 Sider，影响子元素的渲染顺序 | `boolean` | `false` |

### TmLayoutHeader Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| style | 自定义样式 | `CSSProperties` | - |
| class | 自定义类名 | `string` | - |

### TmLayoutSider Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| collapsible | 是否可收起 | `boolean` | `false` |
| collapsed | 是否收起（受控） | `boolean` | `false` |
| defaultCollapsed | 默认是否收起 | `boolean` | `false` |
| collapsedWidth | 收起时宽度 | `number` | `80` |
| width | 宽度 | `number \| string` | `200` |
| breakpoint | 触发响应式布局的断点 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | - |
| theme | 主题色 | `'light' \| 'dark'` | `'dark'` |
| trigger | 自定义触发器，设为 null 可隐藏 | `vnode \| #trigger` | - |

### TmLayoutContent Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| style | 自定义样式 | `CSSProperties` | - |
| class | 自定义类名 | `string` | - |

### TmLayoutFooter Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| style | 自定义样式 | `CSSProperties` | - |
| class | 自定义类名 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| collapse | Sider 收起状态变化时触发 | `(collapsed: boolean) => void` |

> TmLayout、TmLayoutHeader、TmLayoutSider、TmLayoutContent 和 TmLayoutFooter 透传 ant-design-vue Layout 的全部 API。
