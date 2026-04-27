# TmPagination 分页

组件描述，完整继承 ant-design-vue 的 Pagination 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-pagination :total="50" :default-current="1" :page-size="10" show-size-changer />
</div>

```vue
<template>
  <tm-pagination :total="50" :default-current="1" :page-size="10" show-size-changer />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| current | 当前页数 | `number` | - |
| defaultCurrent | 默认当前页 | `number` | `1` |
| total | 数据总数 | `number` | `0` |
| pageSize | 每页条数 | `number` | `10` |
| pageSizeOptions | 每页显示选项 | `string[] \| number[]` | `['10', '20', '50', '100']` |
| showSizeChanger | 是否显示页数切换 | `boolean` | `false` |
| showQuickJumper | 是否显示跳转 | `boolean` | `false` |
| showTotal | 显示总数统计 | `(total: number) => string \| slot` | - |
| disabled | 是否禁用分页 | `boolean` | `false` |
| simple | 简单模式 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 页码变化触发 | `(page: number, pageSize: number) => void` |
| showSizeChange | 每页条数变化触发 | `(current: number, size: number) => void` |

> TmPagination 透传 ant-design-vue Pagination 的全部 API。
