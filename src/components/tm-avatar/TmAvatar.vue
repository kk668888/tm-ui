<template>
  <a-avatar
    v-bind="forwardedAttrs"
    :src="src"
    :size="size"
    :shape="shape"
    class="tm-avatar"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </a-avatar>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmAvatar', inheritAttrs: false })

withDefaults(
  defineProps<{
    src?: string
    size?: number | 'small' | 'default' | 'large'
    shape?: 'circle' | 'square'
  }>(),
  {
    size: 'default',
    shape: 'circle',
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-avatar {
  transition: all 0.2s ease;
}
</style>
