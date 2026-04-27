# TmRow / TmCol 栅格

栅格布局组件，包裹 ant-design-vue 的 Row 和 Col 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-row :gutter="16">
    <tm-col :span="12"><div style="padding: 12px; background: #f5f5f5; border-radius: 4px; text-align: center;">Col 12</div></tm-col>
    <tm-col :span="12"><div style="padding: 12px; background: #f5f5f5; border-radius: 4px; text-align: center;">Col 12</div></tm-col>
  </tm-row>
</div>

```vue
<template>
  <tm-row :gutter="16">
    <tm-col :span="12">Col 12</tm-col>
    <tm-col :span="12">Col 12</tm-col>
  </tm-row>
</template>
```

## 响应式布局

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-row :gutter="[16, 16]">
    <tm-col :xs="24" :sm="12" :md="8" :lg="6"><div style="padding: 12px; background: #1677ff; color: white; border-radius: 4px; text-align: center;">Responsive</div></tm-col>
    <tm-col :xs="24" :sm="12" :md="8" :lg="6"><div style="padding: 12px; background: #1677ff; color: white; border-radius: 4px; text-align: center;">Responsive</div></tm-col>
    <tm-col :xs="24" :sm="12" :md="8" :lg="6"><div style="padding: 12px; background: #1677ff; color: white; border-radius: 4px; text-align: center;">Responsive</div></tm-col>
    <tm-col :xs="24" :sm="12" :md="8" :lg="6"><div style="padding: 12px; background: #1677ff; color: white; border-radius: 4px; text-align: center;">Responsive</div></tm-col>
  </tm-row>
</div>

```vue
<template>
  <tm-row :gutter="[16, 16]">
    <tm-col :xs="24" :sm="12" :md="8" :lg="6">Responsive</tm-col>
    <tm-col :xs="24" :sm="12" :md="8" :lg="6">Responsive</tm-col>
    <tm-col :xs="24" :sm="12" :md="8" :lg="6">Responsive</tm-col>
    <tm-col :xs="24" :sm="12" :md="8" :lg="6">Responsive</tm-col>
  </tm-row>
</template>
```

## TmRow API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| gutter | 栅格间隔 | `number \| { xs, sm, md, lg, xl, xxl }` | `0` |
| justify | 主轴对齐方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | 交叉轴对齐方式 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` |
| wrap | 是否自动换行 | `boolean` | `true` |

## TmCol API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | 栅格占位格数 | `number` | `0` |
| offset | 栅格左侧的间隔格数 | `number` | `0` |
| push | 栅格向右移动格数 | `number` | `0` |
| pull | 栅格向左移动格数 | `number` | `0` |
| xs | <576px 响应式栅格 | `number \| { span, offset }` | - |
| sm | ≥576px 响应式栅格 | `number \| { span, offset }` | - |
| md | ≥768px 响应式栅格 | `number \| { span, offset }` | - |
| lg | ≥992px 响应式栅格 | `number \| { span, offset }` | - |
| xl | ≥1200px 响应式栅格 | `number \| { span, offset }` | - |
| xxl | ≥1600px 响应式栅格 | `number \| { span, offset }` | - |

> TmRow 和 TmCol 透传 ant-design-vue Row/Col 的全部 API。
