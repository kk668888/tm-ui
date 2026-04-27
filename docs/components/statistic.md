# TmStatistic 统计数值

组件描述，完整继承 ant-design-vue 的 Statistic 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-statistic title="活跃用户数" :value="112893" />
    <tm-statistic title="销售额" :value="234567" prefix="¥" />
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-statistic title="活跃用户数" :value="112893" />
    <tm-statistic title="销售额" :value="234567" prefix="¥" />
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 数值内容 | `number \| VNode` | `-` |
| precision | 数值精度 | `number` | `-` |
| prefix | 设置数值的前缀 | `string \| VNode` | `-` |
| suffix | 设置数值的后缀 | `string \| VNode` | `-` |
| decimalSeparator | 设置小数点 | `string` | `'.'` |
| groupSeparator | 设置千分位 | `string` | `','` |
| valueStyle | 设置数值的样式 | `CSSProperties` | `-` |
| loading | 是否加载中 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 数值内容 |
| prefix | 自定义前缀 |
| suffix | 自定义后缀 |
| title | 自定义标题 |

> TmStatistic 透传 ant-design-vue Statistic 的全部 API。
