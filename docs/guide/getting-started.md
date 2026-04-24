# 快速开始

## 安装

```bash
pnpm add tm-ui
# 或
npm install tm-ui
# 或
yarn add tm-ui
```

## 依赖

TM-UI 基于 Vue 3 和 ant-design-vue，请确保项目中已安装这些依赖：

```json
{
  "vue": "^3.4.0",
  "ant-design-vue": "^4.0.0"
}
```

## 引入方式

### 全局引入

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import TmUI from 'tm-ui'

const app = createApp(App)
app.use(Antd)
app.use(TmUI)
app.mount('#app')
```

### 按需引入

```typescript
import { createApp } from 'vue'
import { TmButton, TmInput } from 'tm-ui'

const app = createApp(App)
app.use(TmButton)
app.use(TmInput)
app.mount('#app')
```

## 使用

```vue
<template>
  <tm-button type="primary">主要按钮</tm-button>
  <tm-input v-model="value" placeholder="请输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```

## 组件前缀说明

所有组件以 `tm` 前缀命名，在模板中使用 `<tm-xxx>` 的形式：

| 组件名 | 标签 | 说明 |
|--------|------|------|
| TmButton | `<tm-button>` | 增强按钮 |
| TmInput | `<tm-input>` | 增强输入框 |
| TmSelect | `<tm-select>` | 增强选择器 |
| TmTable | `<tm-table>` | 增强表格 |
| TmForm | `<tm-form>` | 增强表单 |
