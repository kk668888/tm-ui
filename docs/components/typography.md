# TmTypography 排版

组件描述，完整继承 ant-design-vue 的 Typography 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-typography>
    <a-typography-title :level="1">一级标题</a-typography-title>
    <a-typography-paragraph>这是一段普通文本内容，用于展示排版效果。</a-typography-paragraph>
    <a-typography-text type="secondary">次要文本</a-typography-text>
  </tm-typography>
</div>

```vue
<template>
  <tm-typography>
    <a-typography-title :level="1">一级标题</a-typography-title>
    <a-typography-paragraph>这是一段普通文本内容，用于展示排版效果。</a-typography-paragraph>
    <a-typography-text type="secondary">次要文本</a-typography-text>
  </tm-typography>
</template>
```

## API

### Props（Typography.Text / Title / Paragraph / Link 通用）

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 文本类型 | `'secondary' \| 'success' \| 'warning' \| 'danger'` | `-` |
| disabled | 是否禁用 | `boolean` | `false` |
| ellipsis | 是否省略 | `boolean \| object` | `false` |
| copyable | 是否可复制 | `boolean \| object` | `false` |
| editable | 是否可编辑 | `boolean \| object` | `false` |
| strong | 是否加粗 | `boolean` | `false` |
| code | 代码风格 | `boolean` | `false` |
| mark | 标记样式 | `boolean` | `false` |
| underline | 下划线 | `boolean` | `false` |
| delete | 删除线 | `boolean` | `false` |

### Props（Typography.Title 专属）

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| level | 标题等级 | `1 \| 2 \| 3 \| 4 \| 5` | `1` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| copy | 点击复制图标时触发 | `(text: string)` |
| editStart | 开始编辑时触发 | `(text: string)` |
| editEnd | 编辑完成时触发 | `(text: string)` |
| ellipsis | 省略状态变化时触发 | `(ellipsis: boolean)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 文本内容 |
| actions | 自定义操作区域（省略/编辑/复制） |

> TmTypography 透传 ant-design-vue Typography 的全部 API。
