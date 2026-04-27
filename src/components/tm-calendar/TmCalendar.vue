<template>
  <a-calendar v-bind="forwardedAttrs" class="tm-calendar">
    <template #default><slot /></template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotProps" />
    </template>
  </a-calendar>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmCalendar', inheritAttrs: false })

const forwardedAttrs = useForwardAttrs()
</script>

<style scoped lang="less">.tm-calendar { width: 100%; }</style>
