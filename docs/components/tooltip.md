# TmTooltip 文字提示

组件描述，完整继承 ant-design-vue 的 Tooltip 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-tooltip title="提示文字">
    <tm-button>Hover me</tm-button>
  </tm-tooltip>
</div>

```vue
<template>
  <tm-tooltip title="提示文字">
    <tm-button>Hover me</tm-button>
  </tm-tooltip>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 提示文字 | `string \| slot` | - |
| trigger | 触发行为 | `'hover' \| 'focus' \| 'click' \| 'contextMenu'` | `'hover'` |
| placement | 提示位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| ...` | `'top'` |
| open | 用于控制浮层显示 | `boolean` | - |
| arrow | 是否显示箭头 | `boolean \| { pointAtCenter: boolean }` | `true` |
| color | 背景颜色 | `string` | - |
| destroyTooltipOnHide | 关闭时是否销毁浮层 | `boolean` | `false` |
| getPopupContainer | 浮层渲染父节点 | `(triggerNode: HTMLElement) => HTMLElement` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| openChange | 显示隐藏变化时触发 | `(visible: boolean) => void` |

> TmTooltip 透传 ant-design-vue Tooltip 的全部 API。
