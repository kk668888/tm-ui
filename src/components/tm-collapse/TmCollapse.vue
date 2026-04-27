<template>
  <a-collapse
    v-bind="forwardedAttrs"
    v-model:active-key="activeKey"
    :accordion="accordion"
    :bordered="bordered"
    :ghost="ghost"
    class="tm-collapse"
    @update:active-key="handleChange"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-collapse>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmCollapse', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | Array<string | number>
    accordion?: boolean
    bordered?: boolean
    ghost?: boolean
  }>(),
  {
    modelValue: () => [],
    accordion: false,
    bordered: true,
    ghost: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | Array<string | number>]
}>()

const forwardedAttrs = useForwardAttrs()

const activeKey = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const handleChange = (key: string | number | Array<string | number>) => {
  emit('update:modelValue', key)
}
</script>

<style scoped lang="less">
.tm-collapse {
  border-radius: 6px;
  overflow: hidden;
}
</style>
