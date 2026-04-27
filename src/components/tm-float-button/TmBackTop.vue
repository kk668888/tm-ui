<template>
  <ForwardRender
    :is="ABackTop"
    :attrs="{ ...forwardedAttrs, class: 'tm-back-top' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { BackTop as ABackTop } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmBackTop', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>
