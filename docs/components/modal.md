# TmModal 对话框

组件描述，完整继承 ant-design-vue 的 Modal 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-button type="primary" @click="visible = true">打开对话框</tm-button>
  <tm-modal v-model="visible" title="基本对话框" @ok="visible = false">
    <p>这是对话框的内容区域。</p>
  </tm-modal>
</div>

```vue
<template>
  <tm-button type="primary" @click="visible = true">打开对话框</tm-button>
  <tm-modal v-model="visible" title="基本对话框" @ok="visible = false">
    <p>这是对话框的内容区域。</p>
  </tm-modal>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| open | 对话框是否可见 | `boolean` | - |
| title | 标题 | `string \| slot` | - |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| okType | 确认按钮类型 | `string` | `'primary'` |
| confirmLoading | 确认按钮 loading | `boolean` | - |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| maskClosable | 点击蒙层是否关闭 | `boolean` | `true` |
| centered | 是否垂直居中 | `boolean` | `false` |
| width | 宽度 | `string \| number` | `520` |
| footer | 底部内容 | `slot \| null` | - |
| destroyOnClose | 关闭时销毁子元素 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| ok | 点击确定回调 | `(e: MouseEvent) => void` |
| cancel | 点击取消回调 | `(e: MouseEvent) => void` |
| afterClose | 完全关闭后触发 | `() => void` |

> TmModal 透传 ant-design-vue Modal 的全部 API。

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
