# TmSpin 加载中

组件描述，完整继承 ant-design-vue 的 Spin 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-spin />
    <tm-spin size="small" />
    <tm-spin size="large" />
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-spin />
    <tm-spin size="small" />
    <tm-spin size="large" />
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| spinning | 是否为加载中状态 | `boolean` | `true` |
| delay | 延迟显示时间（毫秒） | `number` | - |
| tip | 加载提示文案 | `string` | - |
| size | 组件大小 | `'small' \| 'default' \| 'large'` | `'default'` |
| indicator | 自定义加载指示器 | `VNode \| slot` | - |

> TmSpin 透传 ant-design-vue Spin 的全部 API。
