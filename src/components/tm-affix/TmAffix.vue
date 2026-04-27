<template>
  <ForwardRender
    :is="AAffix"
    :attrs="{ ...forwardedAttrs, offsetTop, offsetBottom, class: 'tm-affix' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Affix as AAffix } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmAffix', inheritAttrs: false })

withDefaults(
  defineProps<{
    offsetTop?: number
    offsetBottom?: number
  }>(),
  {
    offsetTop: 0,
    offsetBottom: undefined,
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-affix { z-index: 10; }
</style>
