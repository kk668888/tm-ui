<template>
  <a-input-password
    v-bind="passwordAttrs"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot v-if="name !== 'prefix' && name !== 'suffix'" :name="name" v-bind="slotProps" />
    </template>
  </a-input-password>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmInputPassword',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    allowClear?: boolean
    visibilityToggle?: boolean
    maxlength?: string | number
  }>(),
  {
    placeholder: '请输入密码',
    allowClear: true,
    visibilityToggle: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const forwardedAttrs = useForwardAttrs()

const passwordAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  class: 'tm-input-password',
  placeholder: props.placeholder,
  allowClear: props.allowClear,
  visibilityToggle: props.visibilityToggle,
  maxlength: props.maxlength,
  'onUpdate:value': handleInput,
}))

const handleInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-input-password {
  border-radius: 6px;
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    border-color: var(--ant-color-primary);
  }
}
</style>
