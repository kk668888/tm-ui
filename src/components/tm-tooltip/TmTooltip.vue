<template>
  <a-tooltip
    v-bind="forwardedAttrs"
    :title="title"
    :placement="placement"
    :color="color"
    class="tm-tooltip"
  >
    <slot />
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
  </a-tooltip>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

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
