# TmCheckbox 复选框

组件描述，完整继承 ant-design-vue 的 Checkbox 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-checkbox>选项 1</tm-checkbox>
    <tm-checkbox>选项 2</tm-checkbox>
    <tm-checkbox>选项 3</tm-checkbox>
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-checkbox>选项 1</tm-checkbox>
    <tm-checkbox>选项 2</tm-checkbox>
    <tm-checkbox>选项 3</tm-checkbox>
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked (v-model) | 指定当前是否选中 | `boolean` | `false` |
| defaultChecked | 初始是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 设置 indeterminate 状态，控制不确定样式 | `boolean` | `false` |
| value | 根据 value 进行比较，用于 Checkbox.Group | `any` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(e: Event) => void` |

> TmCheckbox 透传 ant-design-vue Checkbox 的全部 API。
