<template>
  <a-collapse-panel v-bind="forwardedAttrs" class="tm-collapse-panel">
    <template #default><slot /></template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-collapse-panel>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmCollapsePanel', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>
