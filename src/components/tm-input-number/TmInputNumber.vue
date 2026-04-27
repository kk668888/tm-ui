<template>
  <a-input-number
    v-bind="inputNumberAttrs"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-input-number>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmInputNumber',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: number | null
    placeholder?: string
    min?: number
    max?: number
    step?: number
    precision?: number
    controls?: boolean
    addonBefore?: string
    addonAfter?: string
  }>(),
  {
    placeholder: '请输入数字',
    step: 1,
    controls: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const forwardedAttrs = useForwardAttrs()

const inputNumberAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  class: 'tm-input-number',
  placeholder: props.placeholder ?? '请输入数字',
  min: props.min,
  max: props.max,
  step: props.step ?? 1,
  precision: props.precision,
  controls: props.controls ?? true,
  addonBefore: props.addonBefore,
  addonAfter: props.addonAfter,
  onChange: handleChange,
}))

const handleChange = (value: number | null | string) => {
  emit('update:modelValue', typeof value === 'string' ? null : value)
}
</script>

<style scoped lang="less">
.tm-input-number {
  border-radius: 6px;
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    border-color: var(--ant-color-primary);
  }
}
</style>
