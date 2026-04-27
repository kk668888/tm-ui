# TmInputPassword 密码输入框

组件描述，完整继承 ant-design-vue 的 Input.Password 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-input-password placeholder="请输入密码" />
</div>

```vue
<template>
  <tm-input-password placeholder="请输入密码" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue (v-model) | 绑定值 | `string` | `''` |
| placeholder | 输入框提示文案 | `string` | `''` |
| visibilityToggle | 是否显示切换显示密码的图标 | `boolean \| { visible?: boolean, onVisibleChange?: (visible: boolean) => void }` | `{}` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `false` |
| maxLength | 内容最大长度 | `number` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(e: Event) => void` |
| focus | 获取焦点时触发 | `(e: Event) => void` |
| blur | 失去焦点时触发 | `(e: Event) => void` |

> TmInputPassword 透传 ant-design-vue Input.Password 的全部 API。
