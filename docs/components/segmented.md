# TmSegmented 分段控制器

组件描述，完整继承 ant-design-vue 的 Segmented 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-segmented
    :options="['选项一', '选项二', '选项三']"
  />
</div>

```vue
<template>
  <tm-segmented :options="['选项一', '选项二', '选项三']" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model / value | 当前选中值 | `string \| number` | - |
| defaultValue | 默认选中值 | `string \| number` | - |
| options | 选项列表 | `(string \| number \| SegmentedOption)[]` | `[]` |
| disabled | 是否整体禁用 | `boolean` | `false` |
| block | 是否撑满父级宽度 | `boolean` | `false` |
| direction | 布局方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 组件尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| validateStatus | 校验状态 | `'' \| 'success' \| 'warning' \| 'error'` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中值变化时触发 | `(value: string \| number) => void` |

> TmSegmented 透传 ant-design-vue Segmented 的全部 API。
