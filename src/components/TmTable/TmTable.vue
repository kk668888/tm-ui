<template>
  <div class="tm-table-container">
    <a-table
      v-bind="forwardedAttrs"
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :row-key="resolvedRowKey"
      :bordered="bordered"
      :pagination="computedPagination"
      :scroll="scroll"
      class="tm-table"
      @change="handleTableChange"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
/**
 * TmTable - 增强表格组件
 * 包裹 ant-design-vue 的 Table，默认开启 bordered、stripe，内建分页
 */
import { computed, useAttrs, ref, watch } from 'vue'
import type { TmColumn, TmPageInfo } from './types'

defineOptions({
  name: 'TmTable',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    dataSource: T[]
    columns: TmColumn<T>[]
    loading?: boolean
    rowKey?: string | ((record: T) => string)
    pagination?: TmPageInfo | false
    bordered?: boolean
    stripe?: boolean
    scroll?: { x?: number; y?: number }
  }>(),
  {
    loading: false,
    rowKey: 'id',
    pagination: () => ({ current: 1, pageSize: 10, total: 0 }),
    bordered: true,
    stripe: false,
  },
)

const emit = defineEmits<{
  'page-change': [page: number, pageSize: number]
  'sort-change': [sorter: any]
  'row-click': [record: T, index: number]
}>()

const attrs = useAttrs()
const forwardedAttrs = computed(() => {
  const { class: cls, style, ...rest } = attrs
  return rest
})

const resolvedRowKey = computed(() => props.rowKey)

const innerPage = ref({
  current: typeof props.pagination === 'object' ? props.pagination.current : 1,
  pageSize: typeof props.pagination === 'object' ? props.pagination.pageSize : 10,
  total: typeof props.pagination === 'object' ? props.pagination.total : 0,
})

watch(
  () => props.pagination,
  (val) => {
    if (typeof val === 'object') {
      innerPage.value = { ...val }
    }
  },
  { deep: true },
)

const computedPagination = computed(() => {
  if (props.pagination === false) return false
  return {
    current: innerPage.value.current,
    pageSize: innerPage.value.pageSize,
    total: innerPage.value.total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
  }
})

const handleTableChange = (pagination: any, _filters: any, sorter: any) => {
  innerPage.value.current = pagination.current
  innerPage.value.pageSize = pagination.pageSize
  emit('page-change', pagination.current, pagination.pageSize)
  if (sorter && sorter.field) {
    emit('sort-change', sorter)
  }
}
</script>

<style scoped lang="less">
.tm-table-container {
  width: 100%;
}

.tm-table {
  border-radius: 8px;
  overflow: hidden;

  :deep(.ant-table-thead > tr > th) {
    background-color: #fafafa;
    font-weight: 600;
  }

  :deep(.ant-table-tbody > tr:hover > td) {
    background-color: #f5f5f5;
  }
}

/* 暗黑模式 */
:deep(.dark) .tm-table {
  :deep(.ant-table-thead > tr > th) {
    background-color: #1f1f1f;
    color: rgba(255, 255, 255, 0.85);
  }

  :deep(.ant-table-tbody > tr:hover > td) {
    background-color: #262626;
  }
}
</style>
