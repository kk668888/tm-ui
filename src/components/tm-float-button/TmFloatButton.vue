<template>
  <a-float-button v-bind="forwardedAttrs" class="tm-float-button">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-float-button>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmFloatButton', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>
