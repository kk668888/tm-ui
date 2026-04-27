# TmDescriptions 描述列表

组件描述，完整继承 ant-design-vue 的 Descriptions 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-descriptions title="用户信息" :column="2" bordered>
    <a-descriptions-item label="姓名">张三</a-descriptions-item>
    <a-descriptions-item label="年龄">28</a-descriptions-item>
    <a-descriptions-item label="邮箱">zhangsan@example.com</a-descriptions-item>
    <a-descriptions-item label="地址">北京市朝阳区</a-descriptions-item>
  </tm-descriptions>
</div>

```vue
<template>
  <tm-descriptions title="用户信息" :column="2" bordered>
    <a-descriptions-item label="姓名">张三</a-descriptions-item>
    <a-descriptions-item label="年龄">28</a-descriptions-item>
    <a-descriptions-item label="邮箱">zhangsan@example.com</a-descriptions-item>
    <a-descriptions-item label="地址">北京市朝阳区</a-descriptions-item>
  </tm-descriptions>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 描述列表的标题 | `string \| VNode` | `-` |
| extra | 描述列表的操作区域 | `string \| VNode` | `-` |
| bordered | 是否展示边框 | `boolean` | `false` |
| column | 一行的描述项数量 | `number` | `3` |
| size | 设置列表大小 | `'default' \| 'middle' \| 'small'` | `'default'` |
| colon | 是否展示冒号 | `boolean` | `true` |
| layout | 描述布局 | `'horizontal' \| 'vertical'` | `'horizontal'` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| title | 自定义标题 |
| extra | 自定义操作区 |

> TmDescriptions 透传 ant-design-vue Descriptions 的全部 API。
