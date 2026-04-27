# TmCascader 级联选择器

组件描述，完整继承 ant-design-vue 的 Cascader 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-cascader
    :options="[
      { value: 'zhejiang', label: '浙江', children: [
        { value: 'hangzhou', label: '杭州' },
        { value: 'ningbo', label: '宁波' },
      ]},
      { value: 'jiangsu', label: '江苏', children: [
        { value: 'nanjing', label: '南京' },
        { value: 'suzhou', label: '苏州' },
      ]},
    ]"
    placeholder="请选择地区"
  />
</div>

```vue
<template>
  <tm-cascader
    :options="[
      { value: 'zhejiang', label: '浙江', children: [
        { value: 'hangzhou', label: '杭州' },
        { value: 'ningbo', label: '宁波' },
      ]},
      { value: 'jiangsu', label: '江苏', children: [
        { value: 'nanjing', label: '南京' },
        { value: 'suzhou', label: '苏州' },
      ]},
    ]"
    placeholder="请选择地区"
  />
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value (v-model) | 绑定值 | `any[]` | - |
| options | 可选项数据源 | `Array<{ value: any, label: string, children?: any[], disabled?: boolean }>` | - |
| placeholder | 输入框提示文案 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |
| showSearch | 是否支持搜索选项 | `boolean \| object` | `false` |
| changeOnSelect | 是否点击每级都可选中 | `boolean` | `false` |
| expandTrigger | 次级菜单展开方式，可选 `'click'`、`'hover'` | `string` | `'click'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: any, selectedOptions: any[], extra: { selectedValue: any[] }) => void` |
| search | 输入搜索词时触发 | `(value: string) => void` |
| focus | 获取焦点时触发 | `(e: Event) => void` |
| blur | 失去焦点时触发 | `(e: Event) => void` |

> TmCascader 透传 ant-design-vue Cascader 的全部 API。
