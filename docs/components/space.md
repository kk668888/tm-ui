# TmSpace 间距

组件描述，完整继承 ant-design-vue 的 Space 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-button>按钮 1</tm-button>
    <tm-button type="primary">按钮 2</tm-button>
    <tm-button type="dashed">按钮 3</tm-button>
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-button>按钮 1</tm-button>
    <tm-button type="primary">按钮 2</tm-button>
    <tm-button type="dashed">按钮 3</tm-button>
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| align | 对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline'` | - |
| direction | 间距方向 | `'vertical' \| 'horizontal'` | `'horizontal'` |
| size | 间距大小 | `'small' \| 'middle' \| 'large' \| number \| [number, number]` | `'small'` |
| split | 拆分内容（分割符） | `vnode` | - |
| wrap | 是否自动换行 | `boolean` | `false` |

> TmSpace 透传 ant-design-vue Space 的全部 API。
