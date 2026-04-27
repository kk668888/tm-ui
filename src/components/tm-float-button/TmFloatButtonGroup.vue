<template>
  <ForwardRender
    :is="AFloatButtonGroup"
    :attrs="{ ...forwardedAttrs, class: 'tm-float-button-group' }"
    :slots="$slots"
  />
</template>

<script setup lang="ts">
import { FloatButtonGroup as AFloatButtonGroup } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmFloatButtonGroup', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>
