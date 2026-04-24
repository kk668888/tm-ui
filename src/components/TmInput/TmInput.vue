<template>
  <div class="tm-input-wrapper">
    <a-input
      v-if="type === 'input'"
      v-bind="forwardedAttrs"
      v-model:value="inputValue"
      class="tm-input"
      :allow-clear="allowClear"
      :placeholder="placeholder"
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
    </a-input>
    <a-textarea
      v-else-if="type === 'textarea'"
      v-bind="forwardedAttrs"
      v-model:value="inputValue"
      class="tm-textarea"
      :allow-clear="allowClear"
      :placeholder="placeholder"
      :auto-size="autoSize"
      :rows="rows"
      @update:value="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * TmInput - 增强输入框组件
 * 支持 input 和 textarea 两种类型，统一使用 v-model 绑定值
 */
import { computed, useAttrs } from 'vue'

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
    modelValue: '',
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
const forwardedAttrs = computed(() => {
  const { class: cls, style, ...rest } = attrs
  return rest
})

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

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
