<template>
  <ForwardRender
    :is="ATooltip"
    :attrs="{ ...forwardedAttrs, title, placement, color, class: 'tm-tooltip' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Tooltip as ATooltip } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTooltip', inheritAttrs: false })

withDefaults(
  defineProps<{
    title?: string
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
    color?: string
  }>(),
  {
    placement: 'top',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-tooltip {
  display: inline-block;
}
</style>
