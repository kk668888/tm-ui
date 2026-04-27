# TmSlider 滑块

组件描述，完整继承 ant-design-vue 的 Slider 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; width: 300px;">
  <tm-slider :default-value="30" />
</div>

```vue
<template>
  <tm-slider :default-value="30" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value (v-model) | 绑定值 | `number \| number[]` | - |
| defaultValue | 默认值 | `number \| number[]` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number \| null` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
| range | 是否双滑块模式 | `boolean` | `false` |
| dots | 是否只能拖拽到刻度上 | `boolean` | `false` |
| included | 是否包含在标记内 | `boolean` | `true` |
| vertical | 是否垂直模式 | `boolean` | `false` |
| marks | 刻度标记，键为数字，值为字符串或 VNode | `object` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: number \| number[]) => void` |
| afterChange | 值改变且拖拽结束后触发 | `(value: number \| number[]) => void` |

> TmSlider 透传 ant-design-vue Slider 的全部 API。
