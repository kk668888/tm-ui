<template>
  <a-row v-bind="forwardedAttrs" class="tm-row">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-row>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmRow', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">.tm-row { display: flex; flex-wrap: wrap; }</style>
