<template>
  <a-pagination
    v-bind="forwardedAttrs"
    :current="mergedCurrent"
    :page-size="mergedPageSize"
    :total="total"
    :page-size-options="pageSizeOptions"
    :show-size-changer="showSizeChanger"
    :show-quick-jumper="showQuickJumper"
    :show-total="showTotal"
    class="tm-pagination"
    @change="handleChange"
    @show-size-change="handleShowSizeChange"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useForwardAttrs } from '@/utils'

defineOptions({ name: 'TmPagination', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    current?: number
    defaultCurrent?: number
    pageSize?: number
    defaultPageSize?: number
    total?: number
    pageSizeOptions?: string[]
    showSizeChanger?: boolean
    showQuickJumper?: boolean
    showTotal?: boolean | ((total: number, range: [number, number]) => string)
  }>(),
  {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
    pageSizeOptions: () => ['10', '20', '50', '100'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [page: number]
  'update:current': [page: number]
  'update:pageSize': [size: number]
  change: [page: number, pageSize: number]
  showSizeChange: [current: number, size: number]
}>()

const forwardedAttrs = useForwardAttrs()

const innerCurrent = ref(props.modelValue ?? props.current ?? props.defaultCurrent)
const innerPageSize = ref(props.pageSize ?? props.defaultPageSize)

watch(
  () => [props.modelValue, props.current, props.defaultCurrent] as const,
  ([modelValue, current, defaultCurrent]) => {
    if (modelValue !== undefined) {
      innerCurrent.value = modelValue
      return
    }

    if (current !== undefined) {
      innerCurrent.value = current
      return
    }

    innerCurrent.value = defaultCurrent
  },
)

watch(
  () => [props.pageSize, props.defaultPageSize] as const,
  ([pageSize, defaultPageSize]) => {
    innerPageSize.value = pageSize ?? defaultPageSize
  },
)

const mergedCurrent = computed(() => props.modelValue ?? props.current ?? innerCurrent.value)
const mergedPageSize = computed(() => props.pageSize ?? innerPageSize.value)

const isCurrentControlled = computed(() => props.modelValue !== undefined || props.current !== undefined)
const isPageSizeControlled = computed(() => props.pageSize !== undefined)

const updateState = (page: number, size: number) => {
  if (!isCurrentControlled.value) {
    innerCurrent.value = page
  }

  if (!isPageSizeControlled.value) {
    innerPageSize.value = size
  }

  emit('update:modelValue', page)
  emit('update:current', page)
  emit('update:pageSize', size)
}

const handleChange = (page: number, size: number) => {
  updateState(page, size)
  emit('change', page, size)
}

const handleShowSizeChange = (current: number, size: number) => {
  updateState(current, size)
  emit('showSizeChange', current, size)
}

const showTotal = computed(() => {
  if (typeof props.showTotal === 'function') {
    return props.showTotal
  }

  if (props.showTotal) {
    return (total: number) => `共 ${total} 条`
  }

  return undefined
})
</script>

<style scoped lang="less">
.tm-pagination { border-radius: 6px; }
</style>
