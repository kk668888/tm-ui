# TmMentions 提及

组件描述，完整继承 ant-design-vue 的 Mentions 组件。

## 基础使用

<div class="demo-wrapper" style="padding: 16px 0; width: 300px;">
  <tm-mentions placeholder="输入 @ 提及用户" :options="mentionOptions" />
</div>

```vue
<template>
  <tm-mentions placeholder="输入 @ 提及用户" :options="mentionOptions" />
</template>

<script setup lang="ts">
const mentionOptions = [
  { value: 'zhangsan', label: '张三' },
  { value: 'lisi', label: '李四' },
  { value: 'wangwu', label: '王五' },
]
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model / value | 当前值 | `string` | - |
| options | 选项数据列表 | `MentionsOption[]` | `[]` |
| prefix | 触发前缀字符 | `string \| string[]` | `'@'` |
| split | 选项与文本的分隔符 | `string` | `' '` |
| placeholder | 输入框占位文本 | `string` | - |
| autoSize | 自适应高度 | `boolean \| object` | `false` |
| placement | 菜单弹出位置 | `'top' \| 'bottom'` | `'bottom'` |
| filterOption | 自定义筛选函数 | `boolean \| ((inputValue: string, option: MentionsOption) => boolean)` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值改变时触发 | `(value: string) => void` |
| search | 搜索选项时触发 | `(value: string, prefix: string) => void` |
| select | 选中选项时触发 | `(option: MentionsOption, prefix: string) => void` |
| focus | 获得焦点时触发 | `(e: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(e: FocusEvent) => void` |

> TmMentions 透传 ant-design-vue Mentions 的全部 API。

<script setup lang="ts">
const mentionOptions = [
  { value: 'zhangsan', label: '张三' },
  { value: 'lisi', label: '李四' },
  { value: 'wangwu', label: '王五' },
]
</script>
