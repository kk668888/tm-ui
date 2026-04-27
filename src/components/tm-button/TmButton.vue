<template>
  <a-button v-bind="forwardedAttrs" class="tm-btn">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-button>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmButton',
  inheritAttrs: false,
})

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">
.tm-btn {
  font-weight: 500;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}
</style>
