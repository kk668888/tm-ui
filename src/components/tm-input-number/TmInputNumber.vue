<template>
  <a-input-number
    v-bind="forwardedAttrs"
    :value="modelValue"
    class="tm-input-number"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :step="step"
    :precision="precision"
    :controls="controls"
    :addon-before="addonBefore"
    :addon-after="addonAfter"
    @change="handleChange"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-input-number>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmInputNumber',
  inheritAttrs: false,
})

withDefaults(
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
    modelValue: null,
    placeholder: '请输入数字',
    step: 1,
    controls: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const forwardedAttrs = useForwardAttrs()

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
