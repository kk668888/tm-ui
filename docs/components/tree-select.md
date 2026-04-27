# TmTreeSelect 树选择器

组件描述，完整继承 ant-design-vue 的 TreeSelect 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; width: 300px;">
  <tm-tree-select
    :tree-data="[{ title: 'Parent', value: '0', children: [{ title: 'Child 1', value: '0-0' }, { title: 'Child 2', value: '0-1' }] }]"
    placeholder="请选择"
  />
</div>

```vue
<template>
  <tm-tree-select
    :tree-data="[
      { title: 'Parent', value: '0', children: [
        { title: 'Child 1', value: '0-0' },
        { title: 'Child 2', value: '0-1' }
      ]}
    ]"
    placeholder="请选择"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value / v-model:value | 当前选中值 | `string \| string[]` | `-` |
| treeData | 树形数据源 | `array<{ value, title, children }>` | `[]` |
| placeholder | 选择框默认文字 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| multiple | 支持多选 | `boolean` | `false` |
| allowClear | 是否可清除 | `boolean` | `false` |
| showSearch | 是否可搜索 | `boolean` | `single: false \| multiple: true` |
| treeDefaultExpandAll | 默认展开所有节点 | `boolean` | `false` |
| treeCheckable | 显示复选框 | `boolean` | `false` |
| fieldNames | 自定义节点字段 | `{ value?: string, label?: string, children?: string }` | `{ value: 'value', label: 'label', children: 'children' }` |
| maxTagCount | 最多显示标签数 | `number \| 'responsive'` | `-` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中值变化时触发 | `(value, label, extra)` |
| search | 文本框值变化时触发 | `(value)` |
| select | 被选中时触发 | `(value, node)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| dropdownRender | 自定义下拉内容 |

> TmTreeSelect 透传 ant-design-vue TreeSelect 的全部 API。
