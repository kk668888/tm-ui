<template>
  <a-time-picker
    v-bind="forwardedAttrs"
    v-model:value="timeValue"
    class="tm-time-picker"
    :placeholder="placeholder"
    :format="format"
    :value-format="valueFormat"
    :allow-clear="allowClear"
    @update:value="handleChange"
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
    modelValue: null,
    placeholder: '请选择时间',
    format: 'HH:mm:ss',
    allowClear: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | Dayjs | null]
}>()

const forwardedAttrs = useForwardAttrs()

const timeValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

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
