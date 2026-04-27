<template>
  <a-radio
    v-bind="forwardedAttrs"
    v-model:checked="radioChecked"
    class="tm-radio"
    @change="handleChange"
  >
    <slot />
  </a-radio>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({
  name: 'TmRadio',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
  }>(),
  {
    modelValue: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const forwardedAttrs = useForwardAttrs()

const radioChecked = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const handleChange = (e: any) => {
  emit('update:modelValue', e.target?.checked ?? e)
}
</script>

<style scoped lang="less">
.tm-radio {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
