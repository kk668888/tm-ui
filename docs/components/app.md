# TmApp 应用

组件描述，完整继承 ant-design-vue 的 App 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-app>
    <p>应用内容区域，使用 App 组件可获得 Hooks 支持。</p>
  </tm-app>
</div>

```vue
<template>
  <tm-app>
    <p>应用内容区域，使用 App 组件可获得 Hooks 支持。</p>
  </tm-app>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| component | 自定义容器节点名称 | `string` | `'div'` |
| className | 自定义容器类名 | `string` | - |
| style | 自定义容器样式 | `CSSProperties` | - |

> TmApp 透传 ant-design-vue App 的全部 API。
