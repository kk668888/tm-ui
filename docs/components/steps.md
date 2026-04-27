# TmSteps 步骤条

组件描述，完整继承 ant-design-vue 的 Steps 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-steps :current="1">
    <tm-step title="第一步" description="这是描述信息" />
    <tm-step title="第二步" description="这是描述信息" />
    <tm-step title="第三步" description="这是描述信息" />
  </tm-steps>
</div>

```vue
<template>
  <tm-steps :current="1">
    <tm-step title="第一步" description="这是描述信息" />
    <tm-step title="第二步" description="这是描述信息" />
    <tm-step title="第三步" description="这是描述信息" />
  </tm-steps>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| current | 当前步骤索引 | `number` | `0` |
| initial | 起始序号 | `number` | `0` |
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| type | 类型 | `'default' \| 'navigation'` | `'default'` |
| size | 大小 | `'default' \| 'small'` | `'default'` |
| percent | 进度百分比 | `number` | - |
| status | 当前步骤状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | - |
| progressDot | 点状步骤条 | `boolean \| slot` | `false` |
| responsive | 响应式缩略 | `boolean` | `true` |
| items | 步骤项配置数组 | `StepItemType[]` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 点击切换步骤触发 | `(current: number) => void` |

> TmSteps 透传 ant-design-vue Steps 的全部 API。
