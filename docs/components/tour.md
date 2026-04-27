# TmTour 漫游式引导

漫游式引导组件，包裹 ant-design-vue 的 Tour 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <div id="tour-step-1" style="padding: 12px; background: #f5f5f5; border-radius: 4px;">目标元素 1</div>
  <div id="tour-step-2" style="padding: 12px; background: #f5f5f5; border-radius: 4px; margin-top: 8px;">目标元素 2</div>
  <tm-button type="primary" @click="tourOpen = true" style="margin-top: 12px;">打开引导</tm-button>
  <tm-tour v-model:open="tourOpen" :steps="tourSteps" />
</div>

```vue
<template>
  <div>
    <div ref="step1Ref">第一步</div>
    <div ref="step2Ref">第二步</div>
    <tm-tour :steps="steps" v-model:open="open" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(true)
const step1Ref = ref(null)
const step2Ref = ref(null)

const steps = [
  { title: '欢迎', description: '这是引导第一步', target: () => step1Ref.value },
  { title: '下一步', description: '这是引导第二步', target: () => step2Ref.value },
]
</script>
```

## API

TmTour 完整继承 ant-design-vue 的 Tour 组件的所有 props、events 和 slots。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| open | 是否显示 | `boolean` | `false` |
| steps | 引导步骤列表 | `TourStepProps[]` | `[]` |
| current | 当前步骤 | `number` | `0` |
| scrollIntoViewOptions | 滚动到目标时的选项 | `ScrollIntoViewOptions \| boolean` | `{ block: 'center', inline: 'nearest' }` |

### 步骤项配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `string \| VNode \| () => VNode` | - |
| description | 描述 | `string \| VNode \| () => VNode` | - |
| target | 目标元素 | `() => HTMLElement \| null` | - |
| placement | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| nextButtonProps | 下一步按钮配置 | `{ children: string }` | `{ children: '下一步' }` |
| prevButtonProps | 上一步按钮配置 | `{ children: string }` | `{ children: '上一步' }` |
| finishButtonProps | 完成按钮配置 | `{ children: string }` | `{ children: '完成' }` |

> TmTour 透传 ant-design-vue Tour 的全部 API。按钮默认文案已设为中文。

<script setup>
import { ref } from 'vue'
const tourOpen = ref(false)
const tourSteps = [
  { title: '欢迎', description: '这是引导第一步', target: () => document.getElementById('tour-step-1') },
  { title: '完成', description: '引导结束', target: () => document.getElementById('tour-step-2') },
]
</script>
