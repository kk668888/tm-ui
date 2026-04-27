# TmFloatButton 悬浮按钮

悬浮按钮组件，包裹 ant-design-vue 的 FloatButton 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; position: relative; min-height: 60px;">
  <tm-float-button type="primary" style="position: relative;" />
</div>

```vue
<template>
  <tm-float-button type="primary">
    <Icon />
  </tm-float-button>
</template>
```

## 回到顶部

<div class="demo-wrapper" style="padding: 16px 0; position: relative; min-height: 60px;">
  <tm-float-button back-top style="position: relative;" />
</div>

```vue
<template>
  <tm-float-button back-top />
</template>
```

## API

TmFloatButton 完整继承 ant-design-vue 的 FloatButton 组件的所有 props、events 和 slots。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'default'` | `'default'` |
| shape | 按钮形状 | `'circle' \| 'square'` | `'circle'` |
| icon | 自定义图标 | `VNode \| Component` | - |
| style | 自定义样式 | `CSSProperties` | - |

### FloatButton.Group

```vue
<template>
  <tm-float-button-group>
    <tm-float-button>1</tm-float-button>
    <tm-float-button>2</tm-float-button>
  </tm-float-button-group>
</template>
```

> TmFloatButton 透传 ant-design-vue FloatButton 的全部 API。
