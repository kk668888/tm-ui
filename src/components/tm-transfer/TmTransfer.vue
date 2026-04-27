<template>
  <a-transfer
    v-bind="forwardedAttrs"
    :data-source="dataSource"
    :target-keys="targetKeys"
    :titles="titles"
    :show-search="showSearch"
    :list-style="listStyle"
    class="tm-transfer"
    @change="handleChange"
    @search="handleSearch"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-transfer>
</template>

<script setup lang="ts">
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmTransfer', inheritAttrs: false })

withDefaults(
  defineProps<{
    dataSource?: any[]
    targetKeys?: string[]
    titles?: [string, string]
    showSearch?: boolean
    listStyle?: object
  }>(),
  {
    dataSource: () => [],
    targetKeys: () => [],
    titles: () => ['待选列表', '已选列表'],
    showSearch: false,
  },
)

const emit = defineEmits<{
  'change': [nextTargetKeys: string[], direction: string, moveKeys: string[]]
  'search': [direction: string, value: string]
}>()

const forwardedAttrs = useForwardAttrs()

const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
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
