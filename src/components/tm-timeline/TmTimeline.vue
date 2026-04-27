<template>
  <a-timeline v-bind="forwardedAttrs" :mode="mode" :reverse="reverse" :pending="pending" class="tm-timeline">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-timeline>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmTimeline', inheritAttrs: false })
withDefaults(defineProps<{ mode?: 'left' | 'alternate' | 'right'; reverse?: boolean; pending?: boolean }>(), { mode: 'left', reverse: false, pending: false })
const forwardedAttrs = useForwardAttrs()
</script>
