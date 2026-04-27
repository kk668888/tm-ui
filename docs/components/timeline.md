# TmTimeline 时间轴

组件描述，完整继承 ant-design-vue 的 Timeline 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-timeline>
    <a-timeline-item color="blue">2024-01-01 事件一</a-timeline-item>
    <a-timeline-item color="green">2024-02-01 事件二</a-timeline-item>
    <a-timeline-item>2024-03-01 事件三</a-timeline-item>
  </tm-timeline>
</div>

```vue
<template>
  <tm-timeline>
    <a-timeline-item color="blue">2024-01-01 事件一</a-timeline-item>
    <a-timeline-item color="green">2024-02-01 事件二</a-timeline-item>
    <a-timeline-item>2024-03-01 事件三</a-timeline-item>
  </tm-timeline>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| mode | 相对位置 | `'left' \| 'alternate' \| 'right'` | `'left'` |
| pending | 是否存在幽灵节点 | `boolean \| string \| VNode` | `false` |
| pendingDot | 幽灵节点图标 | `string \| VNode` | `'<LoadingOutlined />'` |
| reverse | 是否倒序 | `boolean` | `false` |
| items | 数据列表（V4.x 新增） | `array<{ color, dot, children, position }>` | `[]` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | TimelineItem 子元素 |
| pending | 自定义幽灵节点内容 |

> TmTimeline 透传 ant-design-vue Timeline 的全部 API。
