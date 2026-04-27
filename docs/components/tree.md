# TmTree 树形控件

组件描述，完整继承 ant-design-vue 的 Tree 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; max-width: 300px;">
  <tm-tree
    :tree-data="[{ title: 'Parent', key: '0', children: [{ title: 'Child 1', key: '0-0' }, { title: 'Child 2', key: '0-1' }] }]"
    default-expand-all
  />
</div>

```vue
<template>
  <tm-tree
    :tree-data="[
      { title: 'Parent', key: '0', children: [
        { title: 'Child 1', key: '0-0' },
        { title: 'Child 2', key: '0-1' }
      ]}
    ]"
    default-expand-all
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| treeData | 树形数据源 | `array<{ key, title, children }>` | `[]` |
| checkable | 节点前添加 Checkbox | `boolean` | `false` |
| checkedKeys | 当前选中复选框的节点 | `string[] \| { checked: string[], halfChecked: string[] }` | `[]` |
| selectedKeys | 当前选中节点 | `string[]` | `[]` |
| expandedKeys | 展开的节点 | `string[]` | `[]` |
| autoExpandParent | 是否自动展开父节点 | `boolean` | `true` |
| defaultExpandAll | 默认展开所有节点 | `boolean` | `false` |
| multiple | 支持多选 | `boolean` | `false` |
| selectable | 是否可选中节点 | `boolean` | `true` |
| showLine | 是否展示连接线 | `boolean` | `false` |
| fieldNames | 自定义节点字段 | `{ title?: string, key?: string, children?: string }` | `{ title: 'title', key: 'key', children: 'children' }` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 点击树节点触发 | `(selectedKeys, { event, selected, selectedNodes, node })` |
| check | 点击复选框触发 | `(checkedKeys, { event, checked, checkedNodes, halfCheckedKeys, node })` |
| expand | 展开/收起节点触发 | `(expandedKeys, { expanded, node })` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| title | 自定义标题渲染 |

> TmTree 透传 ant-design-vue Tree 的全部 API。
