<template>
  <ForwardRender
    :is="AStep"
    :attrs="{ ...forwardedAttrs, class: 'tm-step' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { Step as AStep } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmStep', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>
