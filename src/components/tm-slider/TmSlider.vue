<template>
  <a-slider v-bind="forwardedAttrs" v-model:value="sliderValue" :min="min" :max="max" :step="step" :range="range" :marks="marks" :tooltip="tooltip" class="tm-slider" @update:value="handleChange" />
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmSlider', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: number | [number, number]; min?: number; max?: number; step?: number; range?: boolean; marks?: Record<string, string>; tooltip?: boolean }>(), { modelValue: 0, min: 0, max: 100, step: 1, range: false, tooltip: true })
const emit = defineEmits<{ 'update:modelValue': [value: number | [number, number]] }>()
const forwardedAttrs = useForwardAttrs()
const sliderValue = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) })
const handleChange = (v: number | [number, number]) => emit('update:modelValue', v)
</script>
