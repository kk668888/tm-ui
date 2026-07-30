<template>
  <ForwardRender
    :is="ASpace"
    :attrs="{ ...forwardedAttrs, size, direction, align, split, wrap, class: 'tm-space' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import type { VNode } from 'vue'
import { Space as ASpace } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmSpace', inheritAttrs: false })

// ant-design-vue Space 的 split 接受字符串或 VNode 作为分隔符，收敛 any
withDefaults(
  defineProps<{
    size?: number | 'small' | 'middle' | 'large' | [number, number]
    direction?: 'horizontal' | 'vertical'
    align?: 'start' | 'end' | 'center' | 'baseline'
    split?: string | VNode
    wrap?: boolean
  }>(),
  {
    size: 'middle',
    direction: 'horizontal',
    wrap: false,
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-space { border-radius: 6px; }
</style>
