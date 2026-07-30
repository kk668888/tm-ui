---
title: TmMacInput MAC 输入框
---

# TmMacInput MAC 输入框

用于输入和校验 MAC 地址，支持 `00-AA-11-aa-22-33`、`00:AA:11:aa:22:33`、`00AA11aa2233` 三种常见写法。失焦时默认会归一化为大写冒号格式。

## 基础用法

<a-space direction="vertical" style="width: 100%">
  <tm-mac-input v-model="baseValue" @update:parsed="baseParsed = $event" @update:status="baseStatus = $event" />
  <a-typography-text type="secondary">
    当前值：{{ baseValue || '-' }}；状态：{{ baseStatus }}
  </a-typography-text>
  <a-typography-paragraph type="secondary" style="margin-bottom: 0">
    解析结果：{{ baseParsed }}
  </a-typography-paragraph>
</a-space>

```vue
<template>
  <tm-mac-input
    v-model="baseValue"
    @update:parsed="baseParsed = $event"
    @update:status="baseStatus = $event"
  />
</template>
```

## 短横线格式

<a-space direction="vertical" style="width: 100%">
  <tm-mac-input v-model="dashValue" />
  <a-typography-text type="secondary">
    输入 `00-aa-11-aa-22-33` 后失焦，会归一化为：{{ dashValue || '-' }}
  </a-typography-text>
</a-space>

```vue
<template>
  <tm-mac-input v-model="dashValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dashValue = ref('00-aa-11-aa-22-33')
</script>
```

## 冒号格式

<a-space direction="vertical" style="width: 100%">
  <tm-mac-input v-model="colonValue" />
  <a-typography-text type="secondary">
    当前值：{{ colonValue || '-' }}
  </a-typography-text>
</a-space>

```vue
<template>
  <tm-mac-input v-model="colonValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const colonValue = ref('00:AA:11:aa:22:33')
</script>
```

## 错误状态

非法 MAC 会自动显示输入框错误状态，并展示默认错误文案 `MAC格式错误，请重新输入`。

<a-space direction="vertical" style="width: 100%">
  <tm-mac-input
    v-model="invalidMacValue"
    @update:status="invalidMacStatus = $event"
    @update:valid="invalidMacValid = $event"
  />
  <a-typography-text type="secondary">
    当前状态：{{ invalidMacStatus }}；是否合法：{{ invalidMacValid }}
  </a-typography-text>
</a-space>

```vue
<template>
  <tm-mac-input
    v-model="invalidMacValue"
    @update:status="invalidMacStatus = $event"
    @update:valid="invalidMacValid = $event"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const invalidMacValue = ref('00:AA:11:GG:22:33')
const invalidMacStatus = ref('invalid')
const invalidMacValid = ref(false)
</script>
```

## 自定义错误提示

<a-space direction="vertical" style="width: 100%">
  <tm-mac-input
    v-model="customInvalidMacValue"
    invalid-feedback="请输入合法的 MAC 地址"
  />
</a-space>

```vue
<template>
  <tm-mac-input
    v-model="customInvalidMacValue"
    invalid-feedback="请输入合法的 MAC 地址"
  />
</template>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入值 | `string` | - |
| `placeholder` | 占位提示 | `string` | `'请输入 MAC'` |
| `allowClear` | 是否允许清空 | `boolean` | `true` |
| `normalizeOnBlur` | 失焦时是否归一化为大写冒号格式 | `boolean` | `true` |
| `showInvalidStatus` | 非法时是否显示输入框错误状态 | `boolean` | `true` |
| `showInvalidFeedback` | 非法时是否显示错误文案 | `boolean` | `true` |
| `invalidFeedback` | 自定义错误文案 | `string` | `'MAC格式错误，请重新输入'` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值变化时触发 | `(value: string) => void` |
| `update:parsed` | 解析结果变化时触发 | `(parsed: TmMacInputParsed) => void` |
| `update:status` | 状态变化时触发 | `(status: 'empty' \| 'valid' \| 'invalid') => void` |
| `update:valid` | 合法性变化时触发 | `(valid: boolean) => void` |
| `blur` | 输入框失焦时触发 | `(event: FocusEvent) => void` |

<script setup lang="ts">
import { ref } from 'vue'
import type { TmMacInputParsed, TmMacInputStatus } from '../../src/components/tm-mac-input'

const baseValue = ref('')
const baseStatus = ref<TmMacInputStatus>('empty')
const baseParsed = ref<TmMacInputParsed | null>(null)
const dashValue = ref('00-aa-11-aa-22-33')
const colonValue = ref('00:AA:11:aa:22:33')
const invalidMacValue = ref('00:AA:11:GG:22:33')
const invalidMacStatus = ref<TmMacInputStatus>('invalid')
const invalidMacValid = ref(false)
const customInvalidMacValue = ref('00:AA:11:GG:22:33')
</script>
