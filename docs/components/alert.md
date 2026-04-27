# TmAlert 警告提示

组件描述，完整继承 ant-design-vue 的 Alert 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space direction="vertical">
    <tm-alert message="成功提示" type="success" show-icon />
    <tm-alert message="信息提示" type="info" show-icon />
    <tm-alert message="警告提示" type="warning" show-icon />
    <tm-alert message="错误提示" type="error" show-icon />
  </tm-space>
</div>

```vue
<template>
  <tm-space direction="vertical">
    <tm-alert message="成功提示" type="success" show-icon />
    <tm-alert message="信息提示" type="info" show-icon />
    <tm-alert message="警告提示" type="warning" show-icon />
    <tm-alert message="错误提示" type="error" show-icon />
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 警告提示内容 | `string \| slot` | - |
| description | 警告提示辅助性文字 | `string \| slot` | - |
| type | 指定警告提示样式 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| showIcon | 是否显示辅助图标 | `boolean` | `false` |
| closable | 是否可关闭 | `boolean` | `false` |
| closeText | 自定义关闭按钮 | `string \| slot` | - |
| banner | 用作 Banner 模式 | `boolean` | `false` |
| action | 自定义操作项 | `slot` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭时触发 | `(e: MouseEvent) => void` |

> TmAlert 透传 ant-design-vue Alert 的全部 API。
