# TmConfigProvider 全局化配置

组件描述，完整继承 ant-design-vue 的 ConfigProvider 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-config-provider :theme="{ token: { colorPrimary: '#1677ff' } }">
    <tm-button type="primary">主题色按钮</tm-button>
  </tm-config-provider>
</div>

```vue
<template>
  <tm-config-provider :theme="{ token: { colorPrimary: '#1677ff' } }">
    <tm-button type="primary">主题色按钮</tm-button>
  </tm-config-provider>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| componentSize | 全局组件尺寸 | `'small' \| 'middle' \| 'large'` | - |
| direction | 全局布局方向 | `'ltr' \| 'rtl'` | `'ltr'` |
| locale | 语言包配置 | `Locale` | 默认英文 |
| theme | 主题配置（Design Token） | `{ token, components }` | - |
| renderEmpty | 自定义全局空状态 | `() => vnode` | - |
| wave | 点击波纹动效配置 | `{ disabled: boolean }` | - |
| autoInsertSpaceInButton | 是否自动给两个汉字间加空格 | `boolean` | `true` |
| form | 全局表单配置 | `{ requiredMark }` | - |

> TmConfigProvider 透传 ant-design-vue ConfigProvider 的全部 API。
