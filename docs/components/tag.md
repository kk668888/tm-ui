# TmTag 标签

组件描述，完整继承 ant-design-vue 的 Tag 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-tag color="blue">蓝色标签</tm-tag>
    <tm-tag color="green">绿色标签</tm-tag>
    <tm-tag color="red">红色标签</tm-tag>
    <tm-tag color="orange">橙色标签</tm-tag>
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-tag color="blue">蓝色标签</tm-tag>
    <tm-tag color="green">绿色标签</tm-tag>
    <tm-tag color="red">红色标签</tm-tag>
    <tm-tag color="orange">橙色标签</tm-tag>
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| color | 标签颜色 | `string` | `-` |
| closable | 是否可关闭 | `boolean` | `false` |
| visible | 标签是否可见 | `boolean` | `true` |
| bordered | 是否展示边框 | `boolean` | `true` |
| icon | 设置图标 | `VNode` | `-` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭时触发 | `(e: MouseEvent)` |
| afterClose | 关闭动画结束后触发 | `()` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标签内容 |
| icon | 自定义图标 |
| closeIcon | 自定义关闭图标 |

> TmTag 透传 ant-design-vue Tag 的全部 API。
