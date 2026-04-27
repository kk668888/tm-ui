# TmCard 卡片

组件描述，完整继承 ant-design-vue 的 Card 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-card title="卡片标题" style="max-width: 400px;">
    <p>卡片内容区域，可以包含任意内容。</p>
  </tm-card>
</div>

```vue
<template>
  <tm-card title="卡片标题">
    <p>卡片内容区域，可以包含任意内容。</p>
  </tm-card>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 卡片标题 | `string \| VNode` | `-` |
| extra | 卡片右上角的操作区域 | `string \| VNode` | `-` |
| bordered | 是否有边框 | `boolean` | `true` |
| hoverable | 鼠标移过时可浮起 | `boolean` | `false` |
| size | 卡片尺寸 | `'default' \| 'small'` | `'default'` |
| type | 卡片类型 | `'inner'` | `-` |
| loading | 当卡片内容还在加载中时 | `boolean` | `false` |
| cover | 卡片封面 | `VNode` | `-` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 卡片内容 |
| title | 自定义标题 |
| extra | 自定义右上角操作区 |
| cover | 自定义封面 |
| actions | 卡片操作组 |

> TmCard 透传 ant-design-vue Card 的全部 API。
