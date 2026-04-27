# TmPageHeader 页头

页头组件，包裹 ant-design-vue 的 PageHeader 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; border: 1px solid #f0f0f0; border-radius: 4px;">
  <tm-page-header title="详情页面" sub-title="这是一个页面示例" />
</div>

```vue
<template>
  <tm-page-header title="详情页面" @back="goBack" />
</template>

<script setup>
function goBack() {
  history.back()
}
</script>
```

## 带描述

<div class="demo-wrapper" style="padding: 16px 0; border: 1px solid #f0f0f0; border-radius: 4px;">
  <tm-page-header
    title="订单详情"
    sub-title="订单号：123456789"
  />
</div>

```vue
<template>
  <tm-page-header
    title="订单详情"
    sub-title="订单号：123456789"
  />
</template>
```

## API

TmPageHeader 完整继承 ant-design-vue 的 PageHeader 组件的所有 props、events 和 slots。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string \| VNode` | - |
| subTitle | 子标题 | `string \| VNode` | - |
| ghost | 是否为幽灵模式 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| back | 点击返回按钮时触发 | `(event: MouseEvent)` |

> TmPageHeader 透传 ant-design-vue PageHeader 的全部 API。
