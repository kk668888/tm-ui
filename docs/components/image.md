# TmImage 图片

组件描述，完整继承 ant-design-vue 的 Image 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-image
    width="200"
    src="https://via.placeholder.com/200x150?text=Demo+Image"
    fallback="https://via.placeholder.com/200x150?text=Fallback"
  />
</div>

```vue
<template>
  <tm-image
    width="200"
    src="https://via.placeholder.com/200x150?text=Demo+Image"
    fallback="https://via.placeholder.com/200x150?text=Fallback"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 图片地址 | `string` | `-` |
| alt | 图像文本描述 | `string` | `-` |
| fallback | 加载失败时的备用地址 | `string` | `-` |
| preview | 是否展示预览图 | `boolean \| object` | `true` |
| width | 图片宽度 | `string \| number` | `-` |
| height | 图片高度 | `string \| number` | `-` |
| placeholder | 占位内容 | `VNode` | `-` |
| rootMargin | 预加载偏移量 | `string` | `-` |
| threshold | 预加载阈值 | `number` | `-` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| load | 图片加载成功触发 | `(Event)` |
| error | 图片加载失败触发 | `(Event)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| placeholder | 自定义占位内容 |
| previewMask | 自定义预览蒙层 |

> TmImage 透传 ant-design-vue Image 的全部 API。
