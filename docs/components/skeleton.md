# TmSkeleton 骨架屏

组件描述，完整继承 ant-design-vue 的 Skeleton 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-skeleton active />
</div>

```vue
<template>
  <tm-skeleton active />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| active | 是否展示动画效果 | `boolean` | `false` |
| loading | 是否显示骨架屏（为 false 时显示子元素） | `boolean` | `true` |
| title | 是否显示标题占位 | `boolean \| object` | `true` |
| paragraph | 是否显示段落占位 | `boolean \| { rows: number, width: string \| number }` | `true` |
| avatar | 是否显示头像占位 | `boolean \| object` | `false` |
| page | 是否显示页面级骨架屏 | `boolean` | `false` |
| round | 是否使用圆角 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 实际内容（loading 为 false 时显示） |

> TmSkeleton 透传 ant-design-vue Skeleton 的全部 API。
