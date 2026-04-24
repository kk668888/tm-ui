# TmForm 表单

增强表单组件，支持基于 JSON Schema 的表单自动生成。

## 自动生成

<tm-form v-model:model="formData" :schema="formSchema" auto-generate :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" />

Model: {{ formData }}

```vue
<template>
  <tm-form
    v-model:model="formData"
    :schema="formSchema"
    auto-generate
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TmFormSchemaItem } from 'tm-ui'

const formData = ref({ name: '', email: '', role: undefined })

const formSchema: TmFormSchemaItem[] = [
  { field: 'name', label: '姓名', type: 'input', rules: [{ required: true, message: '必填' }] },
  { field: 'email', label: '邮箱', type: 'input', rules: [{ type: 'email', message: '邮箱格式错误' }] },
  {
    field: 'role',
    label: '角色',
    type: 'select',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '用户', value: 'user' },
    ],
  },
]
</script>
```

## 手动模式

使用默认插槽自由组合表单项：

```vue
<tm-form :model="formData">
  <a-form-item label="姓名" name="name">
    <tm-input v-model="formData.name" placeholder="请输入姓名" />
  </a-form-item>
  <a-form-item label="邮箱" name="email">
    <tm-input v-model="formData.email" placeholder="请输入邮箱" />
  </a-form-item>
</tm-form>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据对象 | `Record<string, any>` | `{}` |
| schema | 表单配置 | `TmFormSchemaItem[]` | `[]` |
| autoGenerate | 是否自动生成表单项 | `boolean` | `false` |
| layout | 布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| labelCol | 标签布局 | `{ span: number }` | `{ span: 4 }` |
| wrapperCol | 控件布局 | `{ span: number }` | `{ span: 20 }` |
