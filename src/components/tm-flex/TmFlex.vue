<template>
  <a-flex v-bind="forwardedAttrs" class="tm-flex">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-flex>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmFlex', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">.tm-flex { display: flex; }</style>
