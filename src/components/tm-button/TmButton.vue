<template>
  <ForwardRender :is="AButton" :attrs="{ ...forwardedAttrs, class: 'tm-btn' }" :slots="$slots" />
</template>

<script setup lang="ts">
import { Button as AButton } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmButton',
  inheritAttrs: false,
})

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-btn {
  font-weight: 500;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}
</style>
