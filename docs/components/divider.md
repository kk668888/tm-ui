# TmDivider 分割线

组件描述，完整继承 ant-design-vue 的 Divider 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <p>上方内容</p>
  <tm-divider />
  <p>下方内容</p>
</div>

```vue
<template>
  <p>上方内容</p>
  <tm-divider />
  <p>下方内容</p>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 分割线类型 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| orientation | 分割文本位置 | `'left' \| 'right' \| 'center' \| 'start' \| 'end'` | `'center'` |
| dashed | 是否为虚线 | `boolean` | `false` |
| orientationMargin | 文字与边框的间距 | `string \| number` | - |
| plain | 文字是否显示为普通正文样式 | `boolean` | `true` |
| variant | 变体样式 | `'solid' \| 'dotted' \| 'dashed'` | `'solid'` |

> TmDivider 透传 ant-design-vue Divider 的全部 API。
