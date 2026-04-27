# TmAvatar 头像

组件描述，完整继承 ant-design-vue 的 Avatar 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-avatar>U</tm-avatar>
    <tm-avatar style="background-color: #f56a00">A</tm-avatar>
    <tm-avatar style="background-color: #1890ff">B</tm-avatar>
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-avatar>U</tm-avatar>
    <tm-avatar style="background-color: #f56a00">A</tm-avatar>
    <tm-avatar style="background-color: #1890ff">B</tm-avatar>
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 图片类头像的资源地址 | `string` | `-` |
| srcSet | 设置图片类头像响应式资源地址 | `string` | `-` |
| icon | 设置头像的图标类型 | `VNode \| string` | `-` |
| alt | 替换文本 | `string` | `-` |
| size | 头像尺寸 | `number \| 'small' \| 'default' \| 'large'` | `'default'` |
| shape | 指定头像形状 | `'circle' \| 'square'` | `'circle'` |
| gap | 文字距离两侧边距（百分比） | `number` | `4` |
| draggable | 图片是否可拖拽 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| error | 图片加载失败时触发 | `(Event)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 头像内容（文字或图标） |

> TmAvatar 透传 ant-design-vue Avatar 的全部 API。
