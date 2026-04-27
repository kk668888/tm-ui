# TmQrCode 二维码

组件描述，完整继承 ant-design-vue 的 QRCode 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-qr-code value="https://example.com" :size="128" />
</div>

```vue
<template>
  <tm-qr-code value="https://example.com" :size="128" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 二维码内容 | `string` | - |
| type | 渲染类型 | `'canvas' \| 'svg'` | `'canvas'` |
| size | 二维码尺寸（宽高一致） | `number` | `160` |
| icon | 二维码中心图标 | `string` (URL) | - |
| iconSize | 图标尺寸 | `number \| [number, number]` | `40` |
| color | 二维码点阵颜色 | `string` | `'#000000'` |
| bgColor | 背景颜色 | `string` | `'#ffffff'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| status | 渲染状态 | `'normal' \| 'expired' \| 'loading' \| 'scanned'` | `'normal'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| refresh | 状态为 expired 时，点击刷新触发 | `(e: Event) => void` |

> TmQrCode 透传 ant-design-vue QRCode 的全部 API。
