<template>
  <a-space v-bind="forwardedAttrs" :size="size" :direction="direction" :align="align" :split="split" :wrap="wrap" class="tm-space">
    <slot />
  </a-space>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

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
