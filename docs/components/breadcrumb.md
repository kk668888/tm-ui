# TmBreadcrumb 面包屑

组件描述，完整继承 ant-design-vue 的 Breadcrumb 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-breadcrumb :items="breadcrumbItems" />
</div>

```vue
<template>
  <tm-breadcrumb :items="breadcrumbItems" />
</template>

<script setup lang="ts">
const breadcrumbItems = [
  { title: '首页', href: '#' },
  { title: '列表', href: '#' },
  { title: '详情' },
]
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| separator | 分隔符 | `string \| VNode` | `'/'` |
| items | 面包屑配置项数组 | `BreadcrumbItemType[]` | - |
| routes | router 路由配置项 | `RouteConfig[]` | - |
| params | 路由参数 | `object` | - |
| menu | 下拉菜单配置 | `MenuProps` | - |

> TmBreadcrumb 透传 ant-design-vue Breadcrumb 的全部 API。

<script setup lang="ts">
const breadcrumbItems = [
  { title: '首页', href: '#' },
  { title: '列表', href: '#' },
  { title: '详情' },
]
</script>
