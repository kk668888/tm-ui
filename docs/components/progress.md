# TmProgress 进度条

组件描述，完整继承 ant-design-vue 的 Progress 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-space direction="vertical" style="width: 300px;">
    <tm-progress :percent="30" />
    <tm-progress :percent="50" status="active" />
    <tm-progress :percent="70" stroke-color="#f56a00" />
    <tm-progress :percent="100" />
  </tm-space>
</div>

```vue
<template>
  <tm-space direction="vertical" style="width: 300px;">
    <tm-progress :percent="30" />
    <tm-progress :percent="50" status="active" />
    <tm-progress :percent="70" stroke-color="#f56a00" />
    <tm-progress :percent="100" />
  </tm-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| percent | 进度百分比 | `number` | `0` |
| status | 状态 | `'normal' \| 'exception' \| 'active' \| 'success'` | - |
| type | 类型 | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| showInfo | 是否显示进度数值 | `boolean` | `true` |
| strokeColor | 进度条颜色 | `string \| string[] \| Record<string, string>` | - |
| strokeWidth | 进度条宽度 | `number` | - |
| trailColor | 未达成进度颜色 | `string` | - |
| format | 内容模板函数 | `(percent: number) => string` | - |
| strokeLinecap | 进度条端点形状 | `'round' \| 'square'` | `'round'` |
| size | 圆形进度大小 | `number \| [number, number]` | `120` |

> TmProgress 透传 ant-design-vue Progress 的全部 API。
