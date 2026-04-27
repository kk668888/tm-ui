<template>
  <a-rate v-bind="forwardedAttrs" v-model:value="rateValue" :count="count" :allow-half="allowHalf" :allow-clear="allowClear" class="tm-rate" @update:value="handleChange" />
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmRate', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: number; count?: number; allowHalf?: boolean; allowClear?: boolean }>(), { modelValue: 0, count: 5, allowHalf: false, allowClear: true })
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const forwardedAttrs = useForwardAttrs()
const rateValue = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) })
const handleChange = (v: number) => emit('update:modelValue', v)
</script>
<style scoped lang="less">.tm-rate { display: inline-flex; }</style>
