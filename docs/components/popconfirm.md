# TmPopconfirm 气泡确认框

组件描述，完整继承 ant-design-vue 的 Popconfirm 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-popconfirm title="确定要删除吗？" @confirm="handleConfirm">
    <tm-button danger>删除</tm-button>
  </tm-popconfirm>
</div>

```vue
<template>
  <tm-popconfirm title="确定要删除吗？" @confirm="handleConfirm">
    <tm-button danger>删除</tm-button>
  </tm-popconfirm>
</template>

<script setup>
function handleConfirm() {
  console.log('已确认删除')
}
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 确认提示标题 | `string \| slot` | - |
| description | 确认提示内容 | `string \| slot` | - |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| icon | 自定义图标 | `VNode \| slot` | - |
| trigger | 触发行为 | `'hover' \| 'focus' \| 'click' \| 'contextMenu'` | `'click'` |
| placement | 气泡位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| ...` | `'top'` |
| disabled | 是否禁用弹出 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| confirm | 点击确认回调 | `(e: MouseEvent) => void` |
| cancel | 点击取消回调 | `(e: MouseEvent) => void` |
| visibleChange | 浮层显隐变化 | `(visible: boolean) => void` |

> TmPopconfirm 透传 ant-design-vue Popconfirm 的全部 API。

<script setup lang="ts">
function handleConfirm() {
  // 确认操作回调
}
</script>
