# TmDropdown 下拉菜单

组件描述，完整继承 ant-design-vue 的 Dropdown 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-dropdown>
    <tm-button>下拉菜单 <DownOutlined /></tm-button>
    <template #overlay>
      <tm-menu>
        <tm-menu-item key="1">选项 1</tm-menu-item>
        <tm-menu-item key="2">选项 2</tm-menu-item>
        <tm-menu-item key="3">选项 3</tm-menu-item>
      </tm-menu>
    </template>
  </tm-dropdown>
</div>

```vue
<template>
  <tm-dropdown>
    <tm-button>下拉菜单</tm-button>
    <template #overlay>
      <tm-menu>
        <tm-menu-item key="1">选项 1</tm-menu-item>
        <tm-menu-item key="2">选项 2</tm-menu-item>
        <tm-menu-item key="3">选项 3</tm-menu-item>
      </tm-menu>
    </template>
  </tm-dropdown>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| trigger | 触发行为 | `('hover' \| 'focus' \| 'click' \| 'contextMenu')[]` | `['hover']` |
| placement | 下拉位置 | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| ...` | `'bottomLeft'` |
| open | 浮层显隐 | `boolean` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| getPopupContainer | 浮层渲染父节点 | `(triggerNode: HTMLElement) => HTMLElement` | - |
| arrow | 是否显示箭头 | `boolean` | `false` |
| overlayClassName | 浮层类名 | `string` | - |
| dropdownRender | 自定义下拉内容 | `(menu: VNode) => VNode` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| openChange | 浮层显隐变化 | `(visible: boolean) => void` |

> TmDropdown 透传 ant-design-vue Dropdown 的全部 API。
