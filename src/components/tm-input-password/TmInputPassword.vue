<template>
  <a-input-password
    v-bind="forwardedAttrs"
    v-model:value="passwordValue"
    class="tm-input-password"
    :placeholder="placeholder"
    :allow-clear="allowClear"
    :visibility-toggle="visibilityToggle"
    :maxlength="maxlength"
    @update:value="handleInput"
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
    modelValue: '',
    placeholder: '请输入密码',
    allowClear: true,
    visibilityToggle: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const forwardedAttrs = useForwardAttrs()

const passwordValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

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
