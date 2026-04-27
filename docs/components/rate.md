# TmRate 评分

组件描述，完整继承 ant-design-vue 的 Rate 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-rate :default-value="3" />
</div>

```vue
<template>
  <tm-rate :default-value="3" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value (v-model) | 绑定值 | `number` | - |
| defaultValue | 默认值 | `number` | `0` |
| count | 总数 | `number` | `5` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowHalf | 是否允许半选 | `boolean` | `false` |
| allowClear | 是否允许再次点击清除 | `boolean` | `true` |
| character | 自定义字符 | `string \| VNode \| ({ index: number }) => VNode` | `<StarFilled />` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: number) => void` |
| hoverChange | 鼠标悬停或离开时触发 | `(value: number) => void` |

> TmRate 透传 ant-design-vue Rate 的全部 API。
