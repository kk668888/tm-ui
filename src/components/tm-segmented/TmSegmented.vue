<template>
  <a-segmented v-bind="segmentedAttrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'
import type { TmOption } from '../shared-types'

defineOptions({ name: 'TmSegmented', inheritAttrs: false })

export type TmSegmentedValue = string | number

export interface TmSegmentedProps {
  modelValue?: TmSegmentedValue
  options?: Array<TmSegmentedValue | TmOption<TmSegmentedValue>>
  block?: boolean
}

const props = withDefaults(defineProps<TmSegmentedProps>(), {
  modelValue: undefined,
  options: () => [],
  block: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()
const forwardedAttrs = useForwardAttrs()

const segmentedAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  options: props.options,
  block: props.block,
  class: 'tm-segmented',
  'onUpdate:value': handleChange,
}))

const handleChange = (v: TmSegmentedValue) => emit('update:modelValue', v)
</script>

<style scoped lang="less">
.tm-segmented {
  border-radius: 6px;
}
</style>
