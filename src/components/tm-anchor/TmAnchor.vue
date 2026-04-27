<template>
  <a-anchor v-bind="forwardedAttrs" :affix="affix" :offset-top="offsetTop" :bounds="bounds" class="tm-anchor">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-anchor>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmAnchor', inheritAttrs: false })

withDefaults(
  defineProps<{
    affix?: boolean
    offsetTop?: number
    bounds?: number
  }>(),
  {
    affix: true,
    offsetTop: 0,
    bounds: 5,
  },
)

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-anchor { border-radius: 6px; }
</style>
