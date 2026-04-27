# TmMenu 导航菜单

组件描述，完整继承 ant-design-vue 的 Menu 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-menu mode="horizontal" :selected-keys="['1']">
    <tm-menu-item key="1">导航 1</tm-menu-item>
    <tm-menu-item key="2">导航 2</tm-menu-item>
    <tm-menu-item key="3">导航 3</tm-menu-item>
  </tm-menu>
</div>

```vue
<template>
  <tm-menu mode="horizontal" :selected-keys="['1']">
    <tm-menu-item key="1">导航 1</tm-menu-item>
    <tm-menu-item key="2">导航 2</tm-menu-item>
    <tm-menu-item key="3">导航 3</tm-menu-item>
  </tm-menu>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| mode | 菜单类型 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| items | 菜单项配置数组 | `MenuItemType[]` | - |
| selectedKeys | 当前选中菜单 | `string[]` | - |
| defaultSelectedKeys | 默认选中菜单 | `string[]` | - |
| openKeys | 当前展开子菜单 | `string[]` | - |
| defaultOpenKeys | 默认展开子菜单 | `string[]` | - |
| inlineCollapsed | 是否收起内联菜单 | `boolean` | `false` |
| inlineIndent | 内联缩进 | `number` | `24` |
| theme | 主题颜色 | `'light' \| 'dark'` | `'light'` |
| overflowedIndicator | 折叠图标 | `VNode \| slot` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击菜单项触发 | `({ item, key, keyPath, domEvent })` |
| select | 选中菜单项触发 | `({ item, key, keyPath, selectedKeys, domEvent })` |
| deselect | 取消选中触发 | `({ item, key, keyPath, selectedKeys, domEvent })` |
| openChange | 子菜单展开/收起 | `(openKeys: string[]) => void` |

> TmMenu 透传 ant-design-vue Menu 的全部 API。
