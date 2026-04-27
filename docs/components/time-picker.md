# TmTimePicker 时间选择器

组件描述，完整继承 ant-design-vue 的 TimePicker 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-time-picker />
</div>

```vue
<template>
  <tm-time-picker />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value (v-model) | 绑定值 | `dayjs` | - |
| defaultValue | 默认值 | `dayjs` | - |
| placeholder | 输入框提示文案 | `string` | `'请选择时间'` |
| format | 时间格式 | `string` | `'HH:mm:ss'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |
| use12Hours | 使用 12 小时制 | `boolean` | `false` |
| hourStep | 小时选项间隔 | `number` | `1` |
| minuteStep | 分钟选项间隔 | `number` | `1` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: dayjs \| string, dateString: string) => void` |
| openChange | 弹出框打开/关闭时触发 | `(open: boolean) => void` |
| focus | 获取焦点时触发 | `(e: Event) => void` |
| blur | 失去焦点时触发 | `(e: Event) => void` |

> TmTimePicker 透传 ant-design-vue TimePicker 的全部 API。
