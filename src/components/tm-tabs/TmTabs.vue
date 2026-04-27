<template>
  <a-tabs
    v-bind="forwardedAttrs"
    v-model:active-key="activeKey"
    :type="type"
    :tab-position="tabPosition"
    :size="size"
    class="tm-tabs"
    @update:active-key="handleChange"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-tabs>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTabs', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: 'line' | 'card' | 'editable-card'
    tabPosition?: 'top' | 'bottom' | 'left' | 'right'
    size?: 'small' | 'middle' | 'large'
  }>(),
  {
    type: 'line',
    tabPosition: 'top',
    size: 'middle',
  },
)

const emit = defineEmits<{
  'update:modelValue': [key: string | number]
  change: [key: string | number]
}>()

const forwardedAttrs = useForwardAttrs()

const activeKey = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const handleChange = (key: string | number) => {
  emit('update:modelValue', key)
  emit('change', key)
}
</script>

<style scoped lang="less">
.tm-tabs { border-radius: 6px; }
</style>
