<template>
  <a-divider v-bind="forwardedAttrs" :type="type" :orientation="orientation" :dashed="dashed" :plain="plain" class="tm-divider">
    <template #default><slot /></template>
  </a-divider>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmDivider', inheritAttrs: false })

withDefaults(
  defineProps<{
    type?: 'horizontal' | 'vertical'
    orientation?: 'left' | 'right' | 'center'
    dashed?: boolean
    plain?: boolean
  }>(),
  {
    type: 'horizontal',
    orientation: 'center',
    dashed: false,
    plain: false,
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-divider { border-radius: 6px; }
</style>
