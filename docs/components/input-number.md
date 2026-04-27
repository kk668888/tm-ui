# TmInputNumber 数字输入框

组件描述，完整继承 ant-design-vue 的 InputNumber 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-input-number :min="0" :max="100" :default-value="10" />
</div>

```vue
<template>
  <tm-input-number :min="0" :max="100" :default-value="10" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue (v-model) | 绑定值 | `number` | - |
| placeholder | 输入框提示文案 | `string` | - |
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| step | 步长 | `number \| string` | `1` |
| precision | 数值精度 | `number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: number \| null, inputValue: string) => void` |
| focus | 获取焦点时触发 | `(e: Event) => void` |
| blur | 失去焦点时触发 | `(e: Event) => void` |

> TmInputNumber 透传 ant-design-vue InputNumber 的全部 API。
