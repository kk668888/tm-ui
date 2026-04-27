<template>
  <ForwardRender
    :is="APopover"
    :attrs="{ ...forwardedAttrs, title, content, trigger, placement, class: 'tm-popover' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Popover as APopover } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmPopover', inheritAttrs: false })

withDefaults(
  defineProps<{
    title?: string
    content?: string
    trigger?: 'hover' | 'focus' | 'click'
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
  }>(),
  {
    trigger: 'hover',
    placement: 'top',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-popover {
  display: inline-block;
}
</style>
