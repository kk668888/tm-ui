# TmMessage 全局提示

组件描述，完整继承 ant-design-vue 的 message 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space>
    <tm-button @click="message.info('信息提示')">Info</tm-button>
    <tm-button @click="message.success('成功提示')" type="primary">Success</tm-button>
    <tm-button @click="message.warning('警告提示')" type="warning">Warning</tm-button>
    <tm-button @click="message.error('错误提示')" type="dashed">Error</tm-button>
  </tm-space>
</div>

```vue
<template>
  <tm-space>
    <tm-button @click="message.info('信息提示')">Info</tm-button>
    <tm-button @click="message.success('成功提示')" type="primary">Success</tm-button>
    <tm-button @click="message.warning('警告提示')" type="warning">Warning</tm-button>
    <tm-button @click="message.error('错误提示')" type="dashed">Error</tm-button>
  </tm-space>
</template>

<script setup>
import { message } from 'ant-design-vue'
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 提示内容 | `string \| VNode \| () => VNode` | - |
| type | 提示类型 | `'success' \| 'info' \| 'warning' \| 'error' \| 'loading'` | - |
| duration | 自动关闭延时（秒） | `number` | `3` |
| onClose | 关闭时回调 | `() => void` | - |
| closable | 是否可关闭 | `boolean` | `false` |
| icon | 自定义图标 | `VNode \| slot` | - |
| top | 距顶部距离 | `string` | `'8px'` |
| maxCount | 最大显示数 | `number` | - |

### 静态方法

| 方法 | 说明 |
|------|------|
| message.success | 成功提示 |
| message.error | 错误提示 |
| message.warning | 警告提示 |
| message.info | 信息提示 |
| message.loading | 加载提示 |

> TmMessage 透传 ant-design-vue message 的全部 API。

<script setup lang="ts">
import { message } from 'ant-design-vue'
</script>
