# TmAnchor 锚点

组件描述，完整继承 ant-design-vue 的 Anchor 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-anchor :items="[
    { key: 'demo-1', href: '#demo-1', title: '示例 1' },
    { key: 'demo-2', href: '#demo-2', title: '示例 2' },
    { key: 'demo-3', href: '#demo-3', title: '示例 3' },
  ]" />
</div>

```vue
<template>
  <tm-anchor :items="[
    { key: 'demo-1', href: '#demo-1', title: '示例 1' },
    { key: 'demo-2', href: '#demo-2', title: '示例 2' },
    { key: 'demo-3', href: '#demo-3', title: '示例 3' },
  ]" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| affix | 固定模式 | `boolean` | `true` |
| bounds | 锚点滚动偏移范围 | `number` | `5` |
| targetOffset | 锚点滚动偏移距离（相对视口顶部） | `number` | `0` |
| offsetTop | 距可视区域顶部的偏移量 | `number` | - |
| showInkInFixed | 固定模式下是否显示指示器 | `boolean` | `false` |
| items | 锚点数据配置项 | `AnchorItem[]` | `[]` |
| direction | 布局方向 | `'vertical' \| 'horizontal'` | `'vertical'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击链接时触发 | `(e: Event, link: AnchorLinkItem) => void` |
| change | 滚动至不同锚点时触发 | `(link: AnchorLinkItem, currentLink: AnchorLinkItem) => void` |

> TmAnchor 透传 ant-design-vue Anchor 的全部 API。
