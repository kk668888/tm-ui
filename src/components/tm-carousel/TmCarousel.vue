<template>
  <a-carousel v-bind="forwardedAttrs" :autoplay="autoplay" :dots="dots" :effect="effect" class="tm-carousel">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-carousel>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmCarousel', inheritAttrs: false })
withDefaults(defineProps<{ autoplay?: boolean; dots?: boolean; effect?: 'scrollx' | 'fade' }>(), { autoplay: false, dots: true, effect: 'scrollx' })
const forwardedAttrs = useForwardAttrs()
</script>
