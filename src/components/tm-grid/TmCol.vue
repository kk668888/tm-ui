<template>
  <a-col v-bind="forwardedAttrs" class="tm-col">
    <template #default><slot /></template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-col>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmCol', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>
