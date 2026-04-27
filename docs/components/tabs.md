# TmTabs 标签页

组件描述，完整继承 ant-design-vue 的 Tabs 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-tabs default-active-key="1">
    <tm-tab-pane key="1" tab="标签 1">
      <p>标签 1 的内容</p>
    </tm-tab-pane>
    <tm-tab-pane key="2" tab="标签 2">
      <p>标签 2 的内容</p>
    </tm-tab-pane>
    <tm-tab-pane key="3" tab="标签 3">
      <p>标签 3 的内容</p>
    </tm-tab-pane>
  </tm-tabs>
</div>

```vue
<template>
  <tm-tabs default-active-key="1">
    <tm-tab-pane key="1" tab="标签 1">
      <p>标签 1 的内容</p>
    </tm-tab-pane>
    <tm-tab-pane key="2" tab="标签 2">
      <p>标签 2 的内容</p>
    </tm-tab-pane>
    <tm-tab-pane key="3" tab="标签 3">
      <p>标签 3 的内容</p>
    </tm-tab-pane>
  </tm-tabs>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| activeKey | 当前激活 tab 面板 | `string` | - |
| defaultActiveKey | 默认面板 | `string` | - |
| type | 标签页类型 | `'line' \| 'card' \| 'editable-card'` | `'line'` |
| size | 大小 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| centered | 是否居中 | `boolean` | `false` |
| tabBarGutter | 标签间距 | `number` | - |
| destroyInactiveTabPane | 销毁未激活面板 | `boolean` | `false` |
| moreIcon | 自定义更多图标 | `VNode \| slot` | - |
| items | 标签项配置数组 | `TabItemType[]` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 切换面板触发 | `(activeKey: string) => void` |
| edit | 编辑标签页触发 | `(targetKey: string, action: 'add' \| 'remove') => void` |
| tabClick | 点击标签时触发 | `(key: string, e: MouseEvent) => void` |
| tabNextClick | 点击下一页标签触发 | `() => void` |
| tabPrevClick | 点击上一页标签触发 | `() => void` |

> TmTabs 透传 ant-design-vue Tabs 的全部 API。
