<template>
  <ForwardRender
    :is="ATimeline"
    :attrs="{ ...forwardedAttrs, mode, reverse, pending, class: 'tm-timeline' }"
    :slots="$slots"
  />
</template>
<script setup lang="ts">
import { Timeline as ATimeline } from 'ant-design-vue'
import { ForwardRender, useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmTimeline', inheritAttrs: false })
withDefaults(defineProps<{ mode?: 'left' | 'alternate' | 'right'; reverse?: boolean; pending?: boolean }>(), { mode: 'left', reverse: false, pending: false })
const forwardedAttrs = useForwardAttrs()
</script>
