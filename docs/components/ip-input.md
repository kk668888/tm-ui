---
title: TmIpInput IP 输入框
---

# TmIpInput IP 输入框

用于输入和校验 IPv4 条件。一个输入框内可同时包含单 IP、多 IP、IP 范围和 IP 段，适合资产筛选、访问控制、扫描范围等业务场景。

## 支持格式

| 格式 | 示例 |
| --- | --- |
| 单 IP | `192.168.0.1` |
| 多 IP | `192.168.0.1,127.0.0.1` |
| IP 范围 | `192.168.0.1-192.168.0.255` |
| IP 段 | `192.168.0.*` |
| 混合条件 | `192.168.0.1,192.168.0.10-192.168.0.20,10.0.0.*` |

多个条件支持使用英文逗号、中文逗号、英文分号、中文分号、顿号和换行分隔。普通空白字符不作为分隔符，只会在每个条件前后被裁剪。

## 基础用法

<a-space direction="vertical" style="width: 100%">
  <tm-ip-input v-model="baseValue" @update:parsed="baseParsed = $event" @update:status="baseStatus = $event" />
  <a-typography-text type="secondary">
    当前值：{{ baseValue || '-' }}；状态：{{ baseStatus }}
  </a-typography-text>
  <a-typography-paragraph type="secondary" style="margin-bottom: 0">
    解析结果：{{ baseParsed }}
  </a-typography-paragraph>
</a-space>

```vue
<template>
  <tm-ip-input
    v-model="baseValue"
    @update:parsed="baseParsed = $event"
    @update:status="baseStatus = $event"
  />
</template>
```

## 混合条件输入

同一个输入框中可以同时输入单 IP、范围和 IP 段。失焦时会统一归一化为英文逗号分隔。

<a-space direction="vertical" style="width: 100%">
  <tm-ip-input v-model="mixedValue" @update:parsed="mixedParsed = $event" />
  <a-typography-text type="secondary">
    当前值：{{ mixedValue || '-' }}
  </a-typography-text>
  <a-typography-paragraph type="secondary" style="margin-bottom: 0">
    条件列表：{{ mixedParsed?.conditions || [] }}
  </a-typography-paragraph>
</a-space>

```vue
<template>
  <tm-ip-input v-model="mixedValue" @update:parsed="mixedParsed = $event" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TmIpInputParsed } from '../../src/components/tm-ip-input'

const mixedValue = ref('192.168.0.1,192.168.0.10-192.168.0.20,10.0.0.*')
const mixedParsed = ref<TmIpInputParsed | null>(null)
</script>
```

## 多分隔符

<a-space direction="vertical" style="width: 100%">
  <tm-ip-input v-model="separatorValue" />
  <a-typography-text type="secondary">
    失焦后会归一化为：{{ separatorValue || '-' }}
  </a-typography-text>
</a-space>

```vue
<template>
  <tm-ip-input v-model="separatorValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const separatorValue = ref('192.168.0.1；192.168.0.10-192.168.0.20、10.0.0.*')
</script>
```

## 错误状态

任意一个条件非法时，整体会进入错误状态，并展示默认错误文案 `IP格式错误，请重新输入`。

<a-space direction="vertical" style="width: 100%">
  <tm-ip-input
    v-model="invalidIpValue"
    @update:status="invalidIpStatus = $event"
    @update:valid="invalidIpValid = $event"
  />
  <a-typography-text type="secondary">
    当前状态：{{ invalidIpStatus }}；是否合法：{{ invalidIpValid }}
  </a-typography-text>
</a-space>

```vue
<template>
  <tm-ip-input
    v-model="invalidIpValue"
    @update:status="invalidIpStatus = $event"
    @update:valid="invalidIpValid = $event"
  />
</template>
```

## 自定义错误提示

<a-space direction="vertical" style="width: 100%">
  <tm-ip-input
    v-model="customInvalidIpValue"
    invalid-feedback="请输入合法的 IP 条件"
  />
</a-space>

```vue
<template>
  <tm-ip-input
    v-model="customInvalidIpValue"
    invalid-feedback="请输入合法的 IP 条件"
  />
</template>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入值 | `string` | - |
| `placeholder` | 占位提示 | `string` | `'请输入 IP'` |
| `allowClear` | 是否允许清空 | `boolean` | `true` |
| `normalizeOnBlur` | 失焦时是否归一化分隔符和条件格式 | `boolean` | `true` |
| `showInvalidStatus` | 非法时是否显示输入框错误状态 | `boolean` | `true` |
| `showInvalidFeedback` | 非法时是否显示错误文案 | `boolean` | `true` |
| `invalidFeedback` | 自定义错误文案 | `string` | `'IP格式错误，请重新输入'` |

## Parse Result

| 字段 | 说明 |
| --- | --- |
| `raw` | 原始输入 |
| `normalized` | 归一化后的输入 |
| `mode` | 单一条件为 `single`、`range`、`segment`；多条件或混合条件为 `multiple` |
| `valid` | 整体是否合法 |
| `items` | 归一化后的条件字符串列表 |
| `conditions` | 结构化条件列表，包含每个条件的 `mode` 和归一化字段 |
| `start` / `end` | 单个 IP 范围时的起止值 |
| `segment` | 单个 IP 段时的归一化值 |
| `error` | 非法时的内部错误原因 |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:parsed` | 解析结果变化时触发 | `(parsed: TmIpInputParsed) => void` |
| `update:status` | 状态变化时触发 | `(status: 'empty' \| 'valid' \| 'invalid') => void` |
| `update:valid` | 合法性变化时触发 | `(valid: boolean) => void` |
| `blur` | 输入框失焦时触发 | `(event: FocusEvent) => void` |

<script setup lang="ts">
import { ref } from 'vue'
import type { TmIpInputParsed, TmIpInputStatus } from '../../src/components/tm-ip-input'

const baseValue = ref('')
const baseStatus = ref<TmIpInputStatus>('empty')
const baseParsed = ref<TmIpInputParsed | null>(null)
const mixedValue = ref('192.168.0.1,192.168.0.10-192.168.0.20,10.0.0.*')
const mixedParsed = ref<TmIpInputParsed | null>(null)
const separatorValue = ref('192.168.0.1；192.168.0.10-192.168.0.20、10.0.0.*')
const invalidIpValue = ref('192.168.0.1,192.168.0.30-192.168.0.20,10.0.0.*')
const invalidIpStatus = ref<TmIpInputStatus>('invalid')
const invalidIpValid = ref(false)
const customInvalidIpValue = ref('999.168.0.1')
</script>
