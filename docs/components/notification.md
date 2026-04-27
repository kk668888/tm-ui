# TmNotification 通知提醒框

组件描述，完整继承 ant-design-vue 的 notification 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-button type="primary" @click="notification.open({ message: '通知标题', description: '这是通知的内容描述信息。' })">
    打开通知
  </tm-button>
</div>

```vue
<template>
  <tm-button type="primary" @click="openNotification">打开通知</tm-button>
</template>

<script setup>
import { notification } from 'ant-design-vue'

function openNotification() {
  notification.open({
    message: '通知标题',
    description: '这是通知的内容描述信息。',
  })
}
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 通知标题 | `string \| VNode \| () => VNode` | - |
| description | 通知内容 | `string \| VNode \| () => VNode` | - |
| placement | 弹出位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'topRight'` |
| duration | 自动关闭延时（秒） | `number` | `4.5` |
| closable | 是否可关闭 | `boolean` | `true` |
| icon | 自定义图标 | `VNode \| slot` | - |
| btn | 自定义关闭按钮 | `VNode \| slot` | - |
| key | 通知唯一标识 | `string \| number` | - |

### 静态方法

| 方法 | 说明 |
|------|------|
| notification.open | 打开通知 |
| notification.success | 成功通知 |
| notification.error | 错误通知 |
| notification.warning | 警告通知 |
| notification.info | 信息通知 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭时触发 | `(e: MouseEvent) => void` |
| click | 点击通知时触发 | `(e: MouseEvent) => void` |

> TmNotification 透传 ant-design-vue notification 的全部 API。

<script setup lang="ts">
import { notification } from 'ant-design-vue'
</script>
