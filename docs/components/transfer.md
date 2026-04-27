# TmTransfer 穿梭框

组件描述，完整继承 ant-design-vue 的 Transfer 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-transfer
    :data-source="[{ key: '1', title: 'Item 1' }, { key: '2', title: 'Item 2' }, { key: '3', title: 'Item 3' }]"
  />
</div>

```vue
<template>
  <tm-transfer
    :data-source="[
      { key: '1', title: 'Item 1' },
      { key: '2', title: 'Item 2' },
      { key: '3', title: 'Item 3' }
    ]"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| dataSource | 数据源 | `array<{ key, title, disabled }>` | `[]` |
| targetKeys | 显示在右侧框数据的 key 集合 | `string[]` | `[]` |
| selectedKeys | 当前选中行的 key 集合 | `string[]` | `[]` |
| render | 每行数据渲染函数 | `(record) => VNode` | `-` |
| showSearch | 是否展示搜索框 | `boolean` | `false` |
| filterOption | 筛选函数 | `(inputValue, option): boolean` | `-` |
| titles | 标题集合 | `string[]` | `['', '']` |
| listStyle | 两个穿梭框的自定义样式 | `object \| object[]` | `-` |
| pagination | 分页配置 | `boolean \| object` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选项在两栏之间转移时的回调 | `(targetKeys, direction, moveKeys)` |
| select | 选中项变化时触发 | `(selectedKeys, direction)` |
| scroll | 列表滚动时的回调 | `(direction, event)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| children | 自定义列表项 |
| footer | 底部渲染 |

> TmTransfer 透传 ant-design-vue Transfer 的全部 API。
