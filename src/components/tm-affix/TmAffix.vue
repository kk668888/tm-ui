<template>
  <a-affix v-bind="forwardedAttrs" :offset-top="offsetTop" :offset-bottom="offsetBottom" class="tm-affix">
    <slot />
  </a-affix>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

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
