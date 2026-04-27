<template>
  <a-popover
    v-bind="forwardedAttrs"
    :title="title"
    :content="content"
    :trigger="trigger"
    :placement="placement"
    class="tm-popover"
  >
    <slot />
    <template #content>
      <slot name="content" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'content'" :name="name" v-bind="slotProps" />
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

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
