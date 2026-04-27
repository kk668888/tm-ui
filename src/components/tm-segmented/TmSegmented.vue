<template>
  <a-segmented v-bind="forwardedAttrs" v-model:value="segmentedValue" :options="options" :block="block" class="tm-segmented" @update:value="handleChange" />
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmSegmented', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: string | number; options?: any[]; block?: boolean }>(), { modelValue: undefined, options: () => [], block: false })
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()
const forwardedAttrs = useForwardAttrs()
const segmentedValue = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) })
const handleChange = (v: string | number) => emit('update:modelValue', v)
</script>
<style scoped lang="less">.tm-segmented { border-radius: 6px; }</style>
