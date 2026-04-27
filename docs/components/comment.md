# TmComment 评论

组件描述，完整继承 ant-design-vue 的 Comment 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-comment
    author="张三"
    content="这是一段评论内容。"
    datetime="2024-01-01 12:00"
  />
</div>

```vue
<template>
  <tm-comment
    author="张三"
    content="这是一段评论内容。"
    datetime="2024-01-01 12:00"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| author | 作者名称 | `string \| VNode` | `-` |
| avatar | 头像图片地址 | `string \| VNode` | `-` |
| content | 评论内容 | `string \| VNode` | `-` |
| actions | 操作按钮列表 | `VNode[]` | `[]` |
| datetime | 显示时间 | `string \| VNode` | `-` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| author | 自定义作者 |
| avatar | 自定义头像 |
| content | 自定义评论内容 |
| actions | 自定义操作按钮 |
| datetime | 自定义时间 |

> TmComment 透传 ant-design-vue Comment 的全部 API。
