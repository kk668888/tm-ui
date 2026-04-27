# TmInput 输入框

增强输入框组件，支持 input 和 textarea 两种类型。

## 基础使用

<tm-input v-model="inputVal" placeholder="请输入内容" />

Value: {{ inputVal }}

```vue
<template>
  <tm-input v-model="value" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('')
</script>
```

## 文本域

<tm-input type="textarea" placeholder="请输入多行文本" :rows="3" />

```vue
<tm-input type="textarea" placeholder="请输入多行文本" :rows="3" />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string` | `''` |
| type | 输入类型 | `'input' \| 'textarea'` | `'input'` |
| placeholder | 占位文本 | `string` | `'请输入'` |
| allowClear | 是否显示清除图标 | `boolean` | `true` |
| rows | textarea 行数 | `number` | `3` |

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('')
</script>
