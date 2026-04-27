# TmBadge 徽标

组件描述，完整继承 ant-design-vue 的 Badge 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-badge :count="5">
      <div style="width: 40px; height: 40px; background: #eee; border-radius: 4px;" />
    </tm-badge>
    <tm-badge :count="10">
      <div style="width: 40px; height: 40px; background: #eee; border-radius: 4px;" />
    </tm-badge>
    <tm-badge dot>
      <div style="width: 40px; height: 40px; background: #eee; border-radius: 4px;" />
    </tm-badge>
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-badge :count="5">
      <div style="width: 40px; height: 40px; background: #eee; border-radius: 4px;" />
    </tm-badge>
    <tm-badge :count="10">
      <div style="width: 40px; height: 40px; background: #eee; border-radius: 4px;" />
    </tm-badge>
    <tm-badge dot>
      <div style="width: 40px; height: 40px; background: #eee; border-radius: 4px;" />
    </tm-badge>
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| count | 展示的数字 | `number \| VNode` | `-` |
| overflowCount | 展示封顶的数字值 | `number` | `99` |
| dot | 不展示数字，只显示小红点 | `boolean` | `false` |
| showZero | 当数值为 0 时是否展示 Badge | `boolean` | `false` |
| status | 设置 Badge 为状态点 | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | `''` |
| color | 自定义小圆点颜色 | `string` | `-` |
| text | 在设置了 status 的前提下有效，设置状态点的文本 | `string` | `''` |
| title | 设置鼠标放在状态点上时显示的文字 | `string` | `count` |
| offset | 设置状态点的位置偏移 | `[number, number]` | `-` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 包裹的子元素 |
| count | 自定义数字内容 |
| text | 自定义状态点文本 |

> TmBadge 透传 ant-design-vue Badge 的全部 API。
