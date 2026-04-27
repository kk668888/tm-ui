<template>
  <a-app v-bind="forwardedAttrs" class="tm-app">
    <template #default><slot /></template>
  </a-app>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmApp', inheritAttrs: false })
const forwardedAttrs = useForwardAttrs()
</script>
<style scoped lang="less">.tm-app { min-height: 100%; }</style>
