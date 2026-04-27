<template>
  <a-progress
    v-bind="forwardedAttrs"
    :percent="percent"
    :type="type"
    :status="status"
    :stroke-color="strokeColor"
    :show-info="showInfo"
    class="tm-progress"
  />
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmProgress', inheritAttrs: false })

withDefaults(
  defineProps<{
    percent?: number
    type?: 'line' | 'circle' | 'dashboard'
    status?: 'normal' | 'active' | 'success' | 'exception'
    strokeColor?: string
    showInfo?: boolean
  }>(),
  {
    percent: 0,
    type: 'line',
    status: 'normal',
    showInfo: true,
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-progress { border-radius: 6px; }
</style>
