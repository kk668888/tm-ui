# TmWatermark 水印

组件描述，完整继承 ant-design-vue 的 Watermark 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-watermark content="tm-ui watermark">
    <div style="height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
      水印内容区域
    </div>
  </tm-watermark>
</div>

```vue
<template>
  <tm-watermark content="tm-ui watermark">
    <div style="height: 200px; background: #f5f5f5;">
      水印内容区域
    </div>
  </tm-watermark>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 水印文本内容 | `string \| string[]` | - |
| image | 水印图片地址 | `string` | - |
| zIndex | 水印层级 | `number` | `1` |
| width | 水印宽度 | `number` | `120` |
| height | 水印高度 | `number` | `64` |
| rotate | 水印旋转角度 | `number` | `-22` |
| gap | 水印之间的间距 | `[number, number]` | `[100, 100]` |
| offset | 水印偏移量 | `[number, number]` | `[gap[0]/2, gap[1]/2]` |
| font | 水印文本字体样式 | `{ color, fontSize, fontWeight, fontFamily, fontStyle }` | - |

> TmWatermark 透传 ant-design-vue Watermark 的全部 API。
