<template>
  <a-watermark v-bind="forwardedAttrs" :content="content" :font="font" :z-index="zIndex" :gap="gap" :rotate="rotate" class="tm-watermark">
    <template #default><slot /></template>
  </a-watermark>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmWatermark', inheritAttrs: false })
withDefaults(defineProps<{ content?: string | string[]; font?: object; zIndex?: number; gap?: [number, number]; rotate?: number }>(), { content: '仅供内部使用', zIndex: 9, rotate: -22 })
const forwardedAttrs = useForwardAttrs()
</script>
