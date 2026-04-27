<template>
  <a-result
    v-bind="forwardedAttrs"
    :status="status"
    :title="title"
    :sub-title="subTitle"
    class="tm-result"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <template #default><slot /></template>
  </a-result>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmResult', inheritAttrs: false })

withDefaults(
  defineProps<{
    status?: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'
    title?: string
    subTitle?: string
  }>(),
  {
    status: 'info',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-result { border-radius: 6px; padding: 24px; }
</style>
