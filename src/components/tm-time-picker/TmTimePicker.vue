<template>
  <a-time-picker
    v-bind="timePickerAttrs"
  >
    <template v-if="$slots.suffixIcon" #suffixIcon>
      <slot name="suffixIcon" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'suffixIcon'" :name="name" v-bind="slotProps" />
    </template>
  </a-time-picker>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'
import type { Dayjs } from 'dayjs'

defineOptions({
  name: 'TmTimePicker',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | Dayjs | null
    placeholder?: string
    format?: string
    valueFormat?: string
    allowClear?: boolean
  }>(),
  {
    placeholder: '请选择时间',
    format: 'HH:mm:ss',
    allowClear: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | Dayjs | null]
}>()

const forwardedAttrs = useForwardAttrs()

const timePickerAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  class: 'tm-time-picker',
  placeholder: props.placeholder,
  format: props.format,
  valueFormat: props.valueFormat,
  allowClear: props.allowClear,
  'onUpdate:value': handleChange,
}))

const handleChange = (value: string | Dayjs | null) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-time-picker {
  border-radius: 6px;
  transition: all 0.2s ease;
}
</style>
