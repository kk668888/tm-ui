# TmResult 结果

组件描述，完整继承 ant-design-vue 的 Result 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-result status="success" title="操作成功" sub-title="您的操作已成功完成" />
</div>

```vue
<template>
  <tm-result status="success" title="操作成功" sub-title="您的操作已成功完成" />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| status | 结果状态 | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500'` | `'info'` |
| title | 标题 | `string \| slot` | - |
| subTitle | 副标题 | `string \| slot` | - |
| icon | 自定义图标 | `VNode \| slot` | - |
| extra | 操作区域 | `VNode \| slot` | - |

> TmResult 透传 ant-design-vue Result 的全部 API。
