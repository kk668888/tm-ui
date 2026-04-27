<template>
  <a-statistic v-bind="forwardedAttrs" :value="value" :prefix="prefix" :suffix="suffix" :precision="precision" :decimal-separator="decimalSeparator" :group-separator="groupSeparator" class="tm-statistic">
    <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
    <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
  </a-statistic>
</template>
<script setup lang="ts">
import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmStatistic', inheritAttrs: false })
withDefaults(defineProps<{ value?: number | string; prefix?: string; suffix?: string; precision?: number; decimalSeparator?: string; groupSeparator?: string }>(), {})
const forwardedAttrs = useForwardAttrs()
</script>
