# TmCalendar 日历

日历组件，完整继承 ant-design-vue 的 Calendar 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0;">
  <tm-calendar :fullscreen="false" />
</div>

```vue
<template>
  <tm-calendar :fullscreen="false" @select="handleSelect" />
</template>

<script setup>
import { ref } from 'vue'
const selectedDate = ref(null)
function handleSelect(value) {
  selectedDate.value = value
}
</script>
```

## API

TmCalendar 完整继承 ant-design-vue 的 Calendar 组件的所有 props、events 和 slots。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前日期 | `Dayjs \| Date \| string` | 当前日期 |
| fullscreen | 是否全屏显示 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 点击选择日期时触发 | `(date: Dayjs)` |
| panelChange | 日期面板切换时触发 | `(date: Dayjs, mode: string)` |

> TmCalendar 透传 ant-design-vue Calendar 的全部 API。
