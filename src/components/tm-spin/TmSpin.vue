<template>
  <a-spin
    v-bind="forwardedAttrs"
    :spinning="spinning"
    :size="size"
    :tip="tip"
    class="tm-spin"
  >
    <template #default><slot /></template>
    <template v-if="$slots.indicator" #indicator>
      <slot name="indicator" />
    </template>
  </a-spin>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmSpin', inheritAttrs: false })

withDefaults(
  defineProps<{
    spinning?: boolean
    size?: 'small' | 'default' | 'large'
    tip?: string
  }>(),
  {
    spinning: false,
    size: 'default',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-spin { min-height: 100%; }
</style>
