# TmTable 表格

增强表格组件，默认开启 bordered，内建分页器。

## 基础使用

<tm-table :data-source="data" :columns="cols" :pagination="{ current: 1, pageSize: 10, total: 3 }" />

```vue
<template>
  <tm-table
    :data-source="data"
    :columns="columns"
    :pagination="{ current: 1, pageSize: 10, total: data.length }"
  />
</template>

<script setup lang="ts">
const cols = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
]
const data = [
  { id: 1, name: 'John', age: 32 },
  { id: 2, name: 'Mike', age: 28 },
  { id: 3, name: 'Tom', age: 36 },
]
</script>
```

## 加载状态

<tm-table :data-source="data" :columns="cols" :loading="true" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| dataSource | 数据数组 | `T[]` | `[]` |
| columns | 列配置 | `TmColumn[]` | `[]` |
| loading | 加载中 | `boolean` | `false` |
| pagination | 分页配置或 false | `TmPageInfo \| false` | `内置` |
| bordered | 是否显示边框 | `boolean` | `true` |
| rowKey | 行唯一标识 | `string \| (record) => string` | `'id'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| page-change | 分页变化 | `(page, pageSize)` |
| sort-change | 排序变化 | `(sorter)` |
