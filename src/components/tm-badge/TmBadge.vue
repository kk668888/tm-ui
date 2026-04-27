<template>
  <a-badge
    v-bind="forwardedAttrs"
    :count="count"
    :overflow-count="overflowCount"
    :dot="dot"
    :color="color"
    :offset="offset"
    :show-zero="showZero"
    :status="status"
    :text="text"
    :title="badgeTitle"
    class="tm-badge"
  >
    <template v-if="$slots.count" #count>
      <slot name="count" />
    </template>
    <template #default><slot /></template>
  </a-badge>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmBadge', inheritAttrs: false })

withDefaults(
  defineProps<{
    count?: number
    overflowCount?: number
    dot?: boolean
    color?: string
    offset?: [number, number]
    showZero?: boolean
    status?: 'success' | 'processing' | 'default' | 'error' | 'warning'
    text?: string
    badgeTitle?: string
  }>(),
  {
    count: 0,
    dot: false,
    showZero: false,
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-badge {
  display: inline-block;
}
</style>
