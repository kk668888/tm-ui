<template>
  <a-tour v-bind="forwardedAttrs" class="tm-tour">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-tour>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTour', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>
