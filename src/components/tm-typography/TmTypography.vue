<template>
  <ForwardRender :is="ATypography" :attrs="{ ...forwardedAttrs, class: 'tm-typography' }" :slots="$slots" />
</template>
<script setup lang="ts">
import { Typography as ATypography } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmTypography', inheritAttrs: false })
const forwardedAttrs = useForwardAttrs()
</script>
