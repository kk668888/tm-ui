# TmDrawer 抽屉

组件描述，完整继承 ant-design-vue 的 Drawer 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-button type="primary" @click="visible = true">打开抽屉</tm-button>
  <tm-drawer v-model="visible" title="基本抽屉" placement="right">
    <p>这是抽屉的内容区域。</p>
  </tm-drawer>
</div>

```vue
<template>
  <tm-button type="primary" @click="visible = true">打开抽屉</tm-button>
  <tm-drawer v-model="visible" title="基本抽屉" placement="right">
    <p>这是抽屉的内容区域。</p>
  </tm-drawer>
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
| open | 抽屉是否可见 | `boolean` | - |
| title | 标题 | `string \| slot` | - |
| placement | 抽屉方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| width | 宽度 | `string \| number` | `256` |
| height | 高度（上下方向时） | `string \| number` | `256` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| maskClosable | 点击蒙层是否关闭 | `boolean` | `true` |
| mask | 是否展示蒙层 | `boolean` | `true` |
| destroyOnClose | 关闭时销毁子元素 | `boolean` | `false` |
| getContainer | 指定挂载节点 | `string \| HTMLElement \| (() => HTMLElement)` | `'body'` |
| push | 是否推出内容区域 | `boolean \| { distance: string \| number }` | `{ distance: 180 }` |
| extra | 标题栏额外操作 | `slot` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭时触发 | `(e: MouseEvent) => void` |
| afterVisibleChange | 显隐状态变化 | `(visible: boolean) => void` |

> TmDrawer 透传 ant-design-vue Drawer 的全部 API。

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
