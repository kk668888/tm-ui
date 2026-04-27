# TmPopover 气泡卡片

组件描述，完整继承 ant-design-vue 的 Popover 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-popover title="标题" content="这是气泡卡片的内容">
    <tm-button>Hover me</tm-button>
  </tm-popover>
</div>

```vue
<template>
  <tm-popover title="标题" content="这是气泡卡片的内容">
    <tm-button>Hover me</tm-button>
  </tm-popover>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 卡片标题 | `string \| slot` | - |
| content | 卡片内容 | `string \| slot` | - |
| trigger | 触发行为 | `'hover' \| 'focus' \| 'click' \| 'contextMenu'` | `'hover'` |
| placement | 气泡位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| ...` | `'top'` |
| open | 用于控制浮层显示 | `boolean` | - |
| arrow | 是否显示箭头 | `boolean \| { pointAtCenter: boolean }` | `true` |
| destroyTooltipOnHide | 关闭时是否销毁浮层 | `boolean` | `false` |
| overlayClassName | 浮层类名 | `string` | - |
| getPopupContainer | 浮层渲染父节点 | `(triggerNode: HTMLElement) => HTMLElement` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| openChange | 显示隐藏变化时触发 | `(visible: boolean) => void` |

> TmPopover 透传 ant-design-vue Popover 的全部 API。
