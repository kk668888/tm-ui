# TmSelect 选择器

增强选择器组件，支持远程搜索和空状态提示。

## 基础使用

<tm-select v-model="selectVal" :options="options" />

Value: {{ selectVal }}

```vue
<template>
  <tm-select v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectVal = ref(undefined)
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
]
</script>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `any` | `undefined` |
| placeholder | 占位文本 | `string` | `'请选择'` |
| showSearch | 是否显示搜索框 | `boolean` | `true` |
| allowClear | 是否显示清除图标 | `boolean` | `true` |
| options | 选项列表 | `Array<{ label: string; value: any }>` | `[]` |
| loading | 加载中 | `boolean` | `false` |

<script setup lang="ts">
import { ref } from 'vue'
const selectVal = ref(undefined)
const options = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
]
</script>
