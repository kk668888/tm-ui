<template>
  <a-steps
    v-bind="forwardedAttrs"
    :current="current"
    :direction="direction"
    :size="size"
    :type="type"
    class="tm-steps"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-steps>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmSteps', inheritAttrs: false })

withDefaults(
  defineProps<{
    current?: number
    direction?: 'horizontal' | 'vertical'
    size?: 'default' | 'small'
    type?: 'default' | 'navigation'
  }>(),
  {
    current: 0,
    direction: 'horizontal',
    size: 'default',
    type: 'default',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-steps { border-radius: 6px; }
</style>
