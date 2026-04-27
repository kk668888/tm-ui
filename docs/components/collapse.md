# TmCollapse 折叠面板

组件描述，完整继承 ant-design-vue 的 Collapse 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-collapse>
    <tm-collapse-panel header="面板 1" key="1">
      <p>这是面板 1 的内容</p>
    </tm-collapse-panel>
    <tm-collapse-panel header="面板 2" key="2">
      <p>这是面板 2 的内容</p>
    </tm-collapse-panel>
  </tm-collapse>
</div>

```vue
<template>
  <tm-collapse>
    <tm-collapse-panel header="面板 1" key="1">
      <p>这是面板 1 的内容</p>
    </tm-collapse-panel>
    <tm-collapse-panel header="面板 2" key="2">
      <p>这是面板 2 的内容</p>
    </tm-collapse-panel>
  </tm-collapse>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| activeKey / v-model:activeKey | 当前激活 tab 面板的 key | `string \| string[]` | `-` |
| defaultActiveKey | 默认激活的面板 | `string` | `-` |
| accordion | 手风琴模式，每次只能展开一个面板 | `boolean` | `false` |
| bordered | 是否展示边框 | `boolean` | `true` |
| collapsible | 配置可折叠区域 | `'header' \| 'disabled'` | `-` |
| ghost | 幽灵模式，无边框 | `boolean` | `false` |
| destroyInactivePanel | 折叠后是否销毁面板内容 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 切换面板时触发 | `(activeKey: string \| string[])` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 包含 CollapsePanel 子元素 |
| expandIcon | 自定义切换图标 |

> TmCollapse 透传 ant-design-vue Collapse 的全部 API。
