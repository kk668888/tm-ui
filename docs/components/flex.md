# TmFlex 弹性布局

弹性布局组件，包裹 ant-design-vue 的 Flex 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-flex :gap="16">
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">Block 1</div>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">Block 2</div>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">Block 3</div>
  </tm-flex>
</div>

```vue
<template>
  <tm-flex :gap="16">
    <div>Block 1</div>
    <div>Block 2</div>
    <div>Block 3</div>
  </tm-flex>
</template>
```

## 对齐方式

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-flex align="center" justify="space-between">
    <div style="padding: 8px 16px; background: #1677ff; color: white; border-radius: 4px;">Left</div>
    <div style="padding: 8px 16px; background: #1677ff; color: white; border-radius: 4px;">Center</div>
    <div style="padding: 8px 16px; background: #1677ff; color: white; border-radius: 4px;">Right</div>
  </tm-flex>
</div>

```vue
<template>
  <tm-flex align="center" justify="space-between">
    <div>Left</div>
    <div>Center</div>
    <div>Right</div>
  </tm-flex>
</template>
```

## API

TmFlex 完整继承 ant-design-vue 的 Flex 组件的所有 props、events 和 slots。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| vertical | 是否垂直排列 | `boolean` | `false` |
| align | 交叉轴对齐方式 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |
| justify | 主轴对齐方式 | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` |
| gap | 子元素间距 | `number \| string` | `0` |

> TmFlex 透传 ant-design-vue Flex 的全部 API。
