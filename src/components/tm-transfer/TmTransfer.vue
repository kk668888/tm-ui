<template>
  <a-transfer
    v-bind="transferAttrs"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-transfer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTransfer', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    // 穿梭框数据源为含 key/title 的记录对象，用 Record<string, unknown> 收敛
    dataSource?: Array<Record<string, unknown>>
    targetKeys?: string[]
    titles?: [string, string]
    showSearch?: boolean
    listStyle?: object
  }>(),
  {
    dataSource: () => [],
    titles: () => ['待选列表', '已选列表'],
    showSearch: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [keys: string[]]
  'update:targetKeys': [keys: string[]]
  'change': [nextTargetKeys: string[], direction: string, moveKeys: string[]]
  'search': [direction: string, value: string]
}>()

const forwardedAttrs = useForwardAttrs()

const mergedTargetKeys = computed(() => props.targetKeys ?? props.modelValue)

const transferAttrs = computed(() => ({
  ...forwardedAttrs.value,
  dataSource: props.dataSource,
  ...(mergedTargetKeys.value !== undefined ? { targetKeys: mergedTargetKeys.value } : {}),
  titles: props.titles,
  showSearch: props.showSearch,
  listStyle: props.listStyle,
  class: 'tm-transfer',
  onChange: handleChange,
  onSearch: handleSearch,
}))

const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
  emit('update:modelValue', nextTargetKeys)
  emit('update:targetKeys', nextTargetKeys)
  emit('change', nextTargetKeys, direction, moveKeys)
}

const handleSearch = (direction: string, value: string) => {
  emit('search', direction, value)
}
</script>

<style scoped lang="less">
.tm-transfer {
  :deep(.ant-transfer-list) {
    border-radius: 6px;
  }
}
</style>
