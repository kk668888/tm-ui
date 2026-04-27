<template>
  <a-tab-pane v-bind="forwardedAttrs" class="tm-tab-pane">
    <template #default><slot /></template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-tab-pane>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTabPane', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>
