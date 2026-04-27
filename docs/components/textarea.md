# TmTextarea 文本域

组件描述，完整继承 ant-design-vue 的 Textarea 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-textarea placeholder="请输入内容" :auto-size="{ minRows: 2, maxRows: 5 }" />
</div>

```vue
<template>
  <tm-textarea placeholder="请输入内容" :auto-size="{ minRows: 2, maxRows: 5 }" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue (v-model) | 绑定值 | `string` | `''` |
| placeholder | 输入框提示文案 | `string` | `''` |
| allowClear | 是否显示清除按钮 | `boolean` | `false` |
| autoSize | 自适应内容高度，可设置为对象 `{ minRows: number, maxRows: number }` | `boolean \| { minRows: number, maxRows: number }` | `false` |
| maxLength | 内容最大长度 | `number` | - |
| rows | 行数 | `number` | `4` |
| showCount | 是否展示字数统计 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(e: Event) => void` |
| pressEnter | 按下回车时触发 | `(e: Event) => void` |
| focus | 获取焦点时触发 | `(e: Event) => void` |
| blur | 失去焦点时触发 | `(e: Event) => void` |

> TmTextarea 透传 ant-design-vue Textarea 的全部 API。
