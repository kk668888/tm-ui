<template>
  <a-date-picker
    v-bind="datePickerAttrs"
  >
    <template v-if="$slots.suffixIcon" #suffixIcon>
      <slot name="suffixIcon" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'suffixIcon'" :name="name" v-bind="slotProps" />
    </template>
  </a-date-picker>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'
import type { Dayjs } from 'dayjs'

defineOptions({
  name: 'TmDatePicker',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | Dayjs | null
    placeholder?: string
    format?: string
    valueFormat?: string
    disabledDate?: (date: Dayjs) => boolean
    allowClear?: boolean
  }>(),
  {
    placeholder: '请选择日期',
    format: 'YYYY-MM-DD',
    allowClear: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | Dayjs | null]
}>()

const forwardedAttrs = useForwardAttrs()

const datePickerAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  class: 'tm-date-picker',
  placeholder: props.placeholder,
  format: props.format,
  valueFormat: props.valueFormat,
  disabledDate: props.disabledDate,
  allowClear: props.allowClear,
  'onUpdate:value': handleChange,
}))

const handleChange = (value: string | Dayjs | null) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-date-picker {
  border-radius: 6px;
  transition: all 0.2s ease;
}
</style>
