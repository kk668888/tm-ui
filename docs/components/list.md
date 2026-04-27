# TmList 列表

组件描述，完整继承 ant-design-vue 的 List 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-list bordered :data-source="['Item 1', 'Item 2', 'Item 3']">
    <template #renderItem="{ item }">
      <a-list-item>{{ item }}</a-list-item>
    </template>
  </tm-list>
</div>

```vue
<template>
  <tm-list bordered :data-source="['Item 1', 'Item 2', 'Item 3']">
    <template #renderItem="{ item }">
      <a-list-item>{{ item }}</a-list-item>
    </template>
  </tm-list>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| dataSource | 列表数据源 | `any[]` | `[]` |
| bordered | 是否展示边框 | `boolean` | `false` |
| header | 列表头部 | `string \| slot` | `-` |
| footer | 列表底部 | `string \| slot` | `-` |
| loading | 是否加载中 | `boolean \| object` | `false` |
| size | 列表尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| split | 是否展示分割线 | `boolean` | `true` |
| pagination | 分页配置 | `boolean \| object` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| header | 列表头部内容 |
| footer | 列表底部内容 |
| renderItem | 列表项渲染，参数 `{ item, index }` |
| renderHeader | 自定义头部渲染 |
| renderFooter | 自定义底部渲染 |

> TmList 透传 ant-design-vue List 的全部 API。
