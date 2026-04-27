# TmSwitch 开关

组件描述，完整继承 ant-design-vue 的 Switch 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-switch />
    <tm-switch default-checked />
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-switch />
    <tm-switch default-checked />
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
| loading | 加载中的开关 | `boolean` | `false` |
| size | 开关大小，可选 `default`、`small` | `string` | `default` |
| checkedChildren | 选中时的内容 | `string \| slot` | - |
| unCheckedChildren | 非选中时的内容 | `string \| slot` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 变化时回调 | `(checked: boolean, e: Event) => void` |

> TmSwitch 透传 ant-design-vue Switch 的全部 API。
