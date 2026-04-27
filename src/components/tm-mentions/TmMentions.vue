<template>
  <a-mentions v-bind="forwardedAttrs" v-model:value="mentionsValue" :options="options" :placeholder="placeholder" class="tm-mentions" @update:value="handleChange">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps" /></template>
  </a-mentions>
</template>
<script setup lang="ts">
import { computed } from 'vue'; import { useForwardAttrs } from '@/utils'
defineOptions({ name: 'TmMentions', inheritAttrs: false })
const props = withDefaults(defineProps<{ modelValue?: string; options?: any[]; placeholder?: string }>(), { modelValue: '', options: () => [], placeholder: '请输入' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const forwardedAttrs = useForwardAttrs()
const mentionsValue = computed({ get: () => props.modelValue, set: (v) => emit('update:modelValue', v) })
const handleChange = (v: string) => emit('update:modelValue', v)
</script>
