# TmAffix 固钉

组件描述，完整继承 ant-design-vue 的 Affix 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; height: 100px; overflow: auto; position: relative;">
  <tm-affix :offset-top="0">
    <tm-button type="primary">固定在顶部</tm-button>
  </tm-affix>
</div>

```vue
<template>
  <tm-affix :offset-top="0">
    <tm-button type="primary">固定在顶部</tm-button>
  </tm-affix>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| offsetTop | 锚点滚动触发距离 | `number` | - |
| offsetBottom | 锚点滚动触发底部距离 | `number` | - |
| target | 监听滚动事件的容器 | `() => HTMLElement \| Window` | `() => window` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 固钉状态变化 | `(affixed: boolean) => void` |

> TmAffix 透传 ant-design-vue Affix 的全部 API。
