<template>
  <a-textarea
    v-bind="forwardedAttrs"
    v-model:value="textareaValue"
    class="tm-textarea"
    :placeholder="placeholder"
    :allow-clear="allowClear"
    :auto-size="autoSize"
    :rows="rows"
    :maxlength="maxlength"
    :show-count="showCount"
    @update:value="handleChange"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-textarea>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmTextarea',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    allowClear?: boolean
    autoSize?: boolean | { minRows?: number; maxRows?: number }
    rows?: number
    maxlength?: string | number
    showCount?: boolean
  }>(),
  {
    modelValue: '',
    placeholder: '请输入',
    allowClear: true,
    autoSize: false,
    rows: 3,
    showCount: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const forwardedAttrs = useForwardAttrs()

const textareaValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

const handleChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="less">
.tm-textarea {
  border-radius: 6px;
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    border-color: var(--ant-color-primary);
  }
}
</style>
