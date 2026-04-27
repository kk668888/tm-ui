<template>
  <ForwardRender :is="AButton" :attrs="buttonAttrs" :slots="$slots" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Button as AButton } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmButton',
  inheritAttrs: false,
})

const attrs = useAttrs()
const forwardedAttrs = useForwardAttrs()

const buttonAttrs = computed(() => ({
  ...forwardedAttrs.value,
  class: ['tm-btn', attrs.class],
}))
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
