<template>
  <ForwardRender
    :is="AAvatar"
    :attrs="{ ...forwardedAttrs, src, size, shape, class: 'tm-avatar' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Avatar as AAvatar } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

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
