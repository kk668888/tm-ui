<template>
  <ForwardRender
    :is="ASpace"
    :attrs="{ ...forwardedAttrs, size, direction, align, split, wrap, class: 'tm-space' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Space as ASpace } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmSpace', inheritAttrs: false })

withDefaults(
  defineProps<{
    size?: number | 'small' | 'middle' | 'large' | [number, number]
    direction?: 'horizontal' | 'vertical'
    align?: 'start' | 'end' | 'center' | 'baseline'
    split?: any
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
