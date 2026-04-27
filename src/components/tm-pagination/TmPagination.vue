<template>
  <a-pagination
    v-bind="forwardedAttrs"
    v-model:current="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-size-options="pageSizeOptions"
    :show-size-changer="showSizeChanger"
    :show-quick-jumper="showQuickJumper"
    :show-total="showTotal"
    class="tm-pagination"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmPagination', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    pageSize?: number
    total?: number
    pageSizeOptions?: string[]
    showSizeChanger?: boolean
    showQuickJumper?: boolean
    showTotal?: boolean
  }>(),
  {
    modelValue: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: () => ['10', '20', '50', '100'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [page: number]
  'update:pageSize': [size: number]
}>()

const forwardedAttrs = useForwardAttrs()

const currentPage = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const pageSize = computed({
  get: () => props.pageSize,
  set: (val) => emit('update:pageSize', val),
})
</script>

<style scoped lang="less">
.tm-pagination { border-radius: 6px; }
</style>
