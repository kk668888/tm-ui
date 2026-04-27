# TmDatePicker 日期选择器

组件描述，完整继承 ant-design-vue 的 DatePicker 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-date-picker />
    <tm-date-picker picker="month" />
    <tm-date-picker picker="year" />
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-date-picker />
    <tm-date-picker picker="month" />
    <tm-date-picker picker="year" />
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value (v-model) | 绑定值 | `dayjs` | - |
| defaultValue | 默认值 | `dayjs` | - |
| placeholder | 输入框提示文案 | `string \| string[]` | `'请选择日期'` |
| format | 日期格式 | `string` | `'YYYY-MM-DD'` |
| disabled | 是否禁用 | `boolean` | `false` |
| disabledDate | 不可选择的日期 | `(currentDate: dayjs) => boolean` | - |
| showTime | 增加时间选择 | `boolean \| object` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: dayjs \| string, dateString: string \| string[]) => void` |
| openChange | 弹出框打开/关闭时触发 | `(open: boolean) => void` |
| focus | 获取焦点时触发 | `(e: Event) => void` |
| blur | 失去焦点时触发 | `(e: Event) => void` |

> TmDatePicker 透传 ant-design-vue DatePicker 的全部 API。
