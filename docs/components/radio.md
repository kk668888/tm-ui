# TmRadio 单选框

组件描述，完整继承 ant-design-vue 的 Radio 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-radio>选项 A</tm-radio>
    <tm-radio>选项 B</tm-radio>
    <tm-radio>选项 C</tm-radio>
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-radio>选项 A</tm-radio>
    <tm-radio>选项 B</tm-radio>
    <tm-radio>选项 C</tm-radio>
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
| value | 根据 value 进行比较，判断是否选中 | `any` | - |
| name | 设置 name 属性 | `string` | - |

### Radio.Group Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value (v-model) | 用于设置当前选中的值 | `any` | - |
| defaultValue | 默认选中的值 | `any` | - |
| disabled | 整组是否禁用 | `boolean` | `false` |
| name | Radio.Group 下所有 input[type="radio"] 的 name 属性 | `string` | - |
| options | 以配置形式设置子元素 | `Array<{ label: string, value: any, disabled?: boolean }>` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(e: Event) => void` |

> TmRadio 透传 ant-design-vue Radio 的全部 API。
