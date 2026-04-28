<template>
  <div class="tm-input-wrapper">
    <a-input
      v-if="type === 'input'"
      v-bind="inputAttrs"
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
    </a-input>
    <a-textarea
      v-else-if="type === 'textarea'"
      v-bind="textareaAttrs"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * TmInput - 增强输入框组件
 * 支持 input 和 textarea 两种类型，兼容受控与非受控使用方式
 */
import { computed, useAttrs } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmInput',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string
    type?: 'input' | 'textarea'
    placeholder?: string
    allowClear?: boolean
    autoSize?: boolean | { minRows?: number; maxRows?: number }
    rows?: number
  }>(),
  {
    type: 'input',
    placeholder: '请输入',
    allowClear: true,
    autoSize: false,
    rows: 3,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()
const forwardedAttrs = useForwardAttrs()

const inputAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  class: ['tm-input', attrs.class],
  allowClear: props.allowClear,
  placeholder: props.placeholder,
  'onUpdate:value': handleInput,
}))

const textareaAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  class: ['tm-textarea', attrs.class],
  allowClear: props.allowClear,
  placeholder: props.placeholder,
  autoSize: props.autoSize,
  rows: props.rows,
  'onUpdate:value': handleInput,
}))

const handleInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-input-wrapper {
  width: 100%;
}

.tm-input,
.tm-textarea {
  border-radius: 6px;
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    border-color: var(--ant-color-primary);
  }
}

:deep(.ant-input-affix-wrapper) {
  border-radius: 6px;
}
</style>
