<template>
  <a-auto-complete v-bind="autoCompleteAttrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-auto-complete>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'
import type { TmOption } from '../shared-types'

defineOptions({ name: 'TmAutoComplete', inheritAttrs: false })

export interface TmAutoCompleteProps {
  modelValue?: string
  options?: TmOption<string>[]
  placeholder?: string
}

const props = withDefaults(defineProps<TmAutoCompleteProps>(), {
  options: () => [],
  placeholder: '请输入',
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const forwardedAttrs = useForwardAttrs()

const autoCompleteAttrs = computed(() => ({
  ...forwardedAttrs.value,
  ...(props.modelValue !== undefined ? { value: props.modelValue } : {}),
  options: props.options,
  placeholder: props.placeholder,
  class: 'tm-auto-complete',
  'onUpdate:value': handleChange,
}))

const handleChange = (v: string) => emit('update:modelValue', v)
</script>
