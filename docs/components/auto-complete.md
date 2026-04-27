# TmAutoComplete 自动完成

组件描述，完整继承 ant-design-vue 的 AutoComplete 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; width: 200px;">
  <tm-auto-complete
    :options="[{ value: 'Option 1' }, { value: 'Option 2' }, { value: 'Option 3' }]"
    placeholder="请输入内容"
  />
</div>

```vue
<template>
  <tm-auto-complete
    :options="[
      { value: 'Option 1' },
      { value: 'Option 2' },
      { value: 'Option 3' }
    ]"
    placeholder="请输入内容"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model / value | 输入值 | `string` | - |
| options | 自动完成的数据源 | `SelectOptions[]` | - |
| dataSource | 数据源（兼容旧版） | `string[] \| SelectOptions[]` | - |
| placeholder | 输入框占位文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `false` |
| backfill | 是否使用键盘选择项回填 | `boolean` | `false` |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 输入内容变化时触发 | `(value: string) => void` |
| search | 搜索内容变化时触发 | `(value: string) => void` |
| select | 选中选项时触发 | `(value: string, option: SelectOption) => void` |
| focus | 获得焦点时触发 | `(e: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(e: FocusEvent) => void` |

> TmAutoComplete 透传 ant-design-vue AutoComplete 的全部 API。
