# TmMessage 全局提示

`TmMessage` 是对 ant-design-vue `message` 的服务封装，不作为模板组件使用。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-button @click="TmMessage.info('信息提示')">Info</tm-button>
    <tm-button @click="TmMessage.success('成功提示')" type="primary">Success</tm-button>
    <tm-button @click="TmMessage.warning('警告提示')">Warning</tm-button>
    <tm-button @click="TmMessage.error('错误提示')" danger>Error</tm-button>
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-button @click="TmMessage.info('信息提示')">Info</tm-button>
    <tm-button @click="TmMessage.success('成功提示')" type="primary">Success</tm-button>
    <tm-button @click="TmMessage.warning('警告提示')">Warning</tm-button>
    <tm-button @click="TmMessage.error('错误提示')" danger>Error</tm-button>
  </tm-space>
</template>

<script setup lang="ts">
import { TmMessage } from '../../src'
</script>
```

## API

### 方法

| 方法 | 说明 |
|------|------|
| `TmMessage.info(content, duration?, onClose?)` | 信息提示 |
| `TmMessage.success(content, duration?, onClose?)` | 成功提示 |
| `TmMessage.warning(content, duration?, onClose?)` | 警告提示 |
| `TmMessage.error(content, duration?, onClose?)` | 错误提示 |
| `TmMessage.loading(content, duration?, onClose?)` | 加载提示 |
| `TmMessage.open(args)` | 打开自定义提示 |
| `TmMessage.destroy(key?)` | 关闭指定提示或全部提示 |
| `TmMessage.config(options)` | 配置全局行为 |
| `TmMessage.useMessage()` | 获取上下文感知实例 |

### 默认增强

| 项目 | 值 |
|------|----|
| 默认停留时长 | `3` 秒 |
| 默认类名 | `tm-message` |

### 全局注册

使用 `app.use(TmUI)` 后，也可以通过 `this.$tmMessage` 调用。

<script setup lang="ts">
import { TmMessage } from '../../src'
</script>
