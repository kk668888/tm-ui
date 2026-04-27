<template>
  <a-typography v-bind="forwardedAttrs" class="tm-typography">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-typography>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmTypography', inheritAttrs: false })
const forwardedAttrs = useForwardAttrs()
</script>
