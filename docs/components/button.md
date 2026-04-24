# TmButton 按钮

增强按钮组件，包裹 ant-design-vue 的 Button，提供统一的样式前缀。

## 基础使用

<tm-button>Default</tm-button>
<tm-button type="primary">Primary</tm-button>
<tm-button type="dashed">Dashed</tm-button>
<tm-button type="text">Text</tm-button>
<tm-button type="link">Link</tm-button>

```vue
<template>
  <tm-button>Default</tm-button>
  <tm-button type="primary">Primary</tm-button>
  <tm-button type="dashed">Dashed</tm-button>
  <tm-button type="text">Text</tm-button>
  <tm-button type="link">Link</tm-button>
</template>
```

## 按钮类型

<tm-button type="primary">Primary</tm-button>
<tm-button type="primary" danger>Danger</tm-button>
<tm-button type="primary" disabled>Disabled</tm-button>

```vue
<tm-button type="primary">Primary</tm-button>
<tm-button type="primary" danger>Danger</tm-button>
<tm-button type="primary" disabled>Disabled</tm-button>
```

## API

TmButton 完整继承 ant-design-vue 的 Button 组件的所有 props、events 和 slots。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'dashed' \| 'text' \| 'link'` | `'default'` |
| danger | 危险按钮 | `boolean` | `false` |
| disabled | 禁用状态 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| size | 按钮大小 | `'large' \| 'middle' \| 'small'` | `'middle'` |
