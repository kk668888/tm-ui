# TmNotification 通知提醒框

`TmNotification` 是对 ant-design-vue `notification` 的服务封装，不作为模板组件使用。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-button type="primary" @click="openNotification">
    打开通知
  </tm-button>
</div>

```vue
<template>
  <tm-button type="primary" @click="openNotification">打开通知</tm-button>
</template>

<script setup lang="ts">
import { TmNotification } from '../../src'

function openNotification() {
  TmNotification.open({
    message: '通知标题',
    description: '这是通知的内容描述信息。',
  })
}
</script>
```

## API

### 方法

| 方法 | 说明 |
|------|------|
| `TmNotification.open(args)` | 打开通知 |
| `TmNotification.success(args)` | 成功通知 |
| `TmNotification.error(args)` | 错误通知 |
| `TmNotification.warning(args)` | 警告通知 |
| `TmNotification.info(args)` | 信息通知 |
| `TmNotification.close(key)` | 关闭指定通知 |
| `TmNotification.destroy()` | 关闭全部通知 |
| `TmNotification.config(options)` | 配置全局行为 |
| `TmNotification.useNotification()` | 获取上下文感知实例 |

### 默认增强

| 项目 | 值 |
|------|----|
| 默认停留时长 | `4.5` 秒 |
| 默认弹出位置 | `topRight` |
| 默认类名 | `tm-notification` |

### 全局注册

使用 `app.use(TmUI)` 后，也可以通过 `this.$tmNotification` 调用。

<script setup lang="ts">
import { TmNotification } from '../../src'

function openNotification() {
  TmNotification.open({
    message: '通知标题',
    description: '这是通知的内容描述信息。',
  })
}
</script>
