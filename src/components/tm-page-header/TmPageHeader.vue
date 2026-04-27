<template>
  <a-page-header v-bind="forwardedAttrs" class="tm-page-header">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmPageHeader', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">.tm-page-header { margin-bottom: 16px; }</style>
