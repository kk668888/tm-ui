# TmEmpty 空状态

组件描述，完整继承 ant-design-vue 的 Empty 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-empty description="暂无数据" />
</div>

```vue
<template>
  <tm-empty description="暂无数据" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| description | 自定义描述内容 | `string \| VNode` | `''` |
| image | 设置显示图片 | `string` | `-` |
| imageStyle | 图片样式 | `CSSProperties` | `-` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义描述内容 |
| image | 自定义图片 |
| description | 自定义描述 |

> TmEmpty 透传 ant-design-vue Empty 的全部 API。
