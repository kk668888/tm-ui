<template>
  <div class="tm-table-container">
    <VxeTable
      v-bind="forwardedAttrs"
      :class="tableClass"
      :data="dataSource"
      :loading="loading"
      :border="bordered ? 'full' : false"
      :stripe="stripe"
      :max-height="maxTableHeight"
      show-overflow="title"
      :row-config="rowConfig"
      :tree-config="treeConfig"
      :sort-config="sortConfig"
      auto-resize
      @sort-change="handleSortChange"
      @cell-click="handleCellClick"
    >
      <template #loading>
        <div class="tm-table-loading">
          <ASpin />
        </div>
      </template>

      <VxeColumn
        v-for="(column, index) in normalizedColumns"
        :key="column.key"
        :field="column.dataIndex"
        :title="column.title"
        :width="column.width"
        :align="column.align"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :show-overflow="column.showOverflow"
        :tree-node="Boolean(treeConfig) && index === 0"
      >
        <template #default="{ row, rowIndex }">
          <BodyCellRenderer
            :body-cell-slot="bodyCellSlot"
            :column="column"
            :record="row"
            :index="rowIndex"
          />
        </template>
      </VxeColumn>
    </VxeTable>

    <div v-if="paginationConfig" class="tm-table-pagination">
      <APagination
        :current="paginationConfig.current"
        :page-size="paginationConfig.pageSize"
        :total="paginationConfig.total"
        :show-size-changer="paginationConfig.showSizeChanger"
        :show-quick-jumper="paginationConfig.showQuickJumper"
        :show-total="paginationConfig.showTotal"
        @change="handlePaginationChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
/**
 * TmTable - 基于 vxe-table 的增强表格组件
 * 保持现有 dataSource / columns / bodyCell 等用法，补一层分页与事件兼容
 */
import { Comment, Fragment, Text, computed, defineComponent, ref, useAttrs, useSlots, watch, type PropType, type VNode } from 'vue'
import { Pagination as APagination, Spin as ASpin } from 'ant-design-vue'
import { VxeColumn, VxeTable } from 'vxe-table'
import { useForwardAttrs } from '@/utils'
import type { TmColumn, TmPageInfo } from './types'

defineOptions({
  name: 'TmTable',
  inheritAttrs: false,
})

type BodyCellSlotProps = {
  column: TmColumn<any>
  record: Record<string, any>
  index: number
}

type BodyCellSlot = (props: BodyCellSlotProps) => VNode[] | undefined

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
  'change': [pagination: TmPageInfo, filters: Record<string, never>, sorter?: any]
}>()

const attrs = useAttrs()
const slots = useSlots()
const forwardedAttrs = useForwardAttrs()

const bodyCellSlot = (slots as Record<string, BodyCellSlot | undefined>).bodyCell
const tableClass = computed(() => ['tm-table', attrs.class])
const maxTableHeight = computed(() => props.scroll?.y)
const sortConfig = { trigger: 'cell' as const, orders: ['asc', 'desc', null] as Array<'asc' | 'desc' | null> }

const innerPage = ref({
  current: typeof props.pagination === 'object' ? props.pagination.current : 1,
  pageSize: typeof props.pagination === 'object' ? props.pagination.pageSize : 10,
  total: typeof props.pagination === 'object' ? props.pagination.total : props.dataSource.length,
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

watch(
  () => props.dataSource.length,
  (length) => {
    if (props.pagination === false) {
      return
    }
    if (typeof props.pagination !== 'object') {
      innerPage.value.total = length
    }
  },
)

const rowConfig = computed(() => {
  if (typeof props.rowKey !== 'string') {
    return undefined
  }
  return {
    keyField: props.rowKey,
  }
})

const treeConfig = computed(() => {
  const hasChildren = props.dataSource.some((item) => Array.isArray((item as Record<string, any>).children) && (item as Record<string, any>).children.length > 0)
  if (!hasChildren) {
    return undefined
  }
  return {
    childrenField: 'children',
  }
})

const normalizedColumns = computed(() =>
  props.columns.map((column) => ({
    ...column,
    sortable: Boolean(column.sorter),
    showOverflow: column.ellipsis ? ('title' as const) : undefined,
  })),
)

const paginationConfig = computed(() => {
  if (props.pagination === false) {
    return null
  }
  return {
    current: innerPage.value.current,
    pageSize: innerPage.value.pageSize,
    total: innerPage.value.total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
  }
})

const BodyCellRenderer = defineComponent({
  name: 'TmTableBodyCellRenderer',
  props: {
    bodyCellSlot: Function as PropType<BodyCellSlot | undefined>,
    column: {
      type: Object as PropType<TmColumn<any>>,
      required: true,
    },
    record: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(rendererProps) {
    return () => {
      const slotNodes = rendererProps.bodyCellSlot?.({
        column: rendererProps.column,
        record: rendererProps.record,
        index: rendererProps.index,
      })

      if (hasRenderableContent(slotNodes)) {
        return slotNodes
      }

      const cellValue = getCellValue(rendererProps.record, rendererProps.column)
      return cellValue == null ? '' : String(cellValue)
    }
  },
})

function getCellValue(record: Record<string, any>, column: TmColumn<any>) {
  if (!column.dataIndex) {
    return ''
  }

  return column.dataIndex
    .split('.')
    .reduce<any>((current, key) => (current == null ? current : current[key]), record)
}

function hasRenderableContent(nodes?: VNode[]) {
  if (!nodes?.length) {
    return false
  }

  return nodes.some((node) => {
    if (!node) {
      return false
    }

    if (node.type === Comment) {
      return false
    }

    if (node.type === Text) {
      return String(node.children ?? '').trim().length > 0
    }

    if (node.type === Fragment) {
      return hasRenderableContent(Array.isArray(node.children) ? (node.children as VNode[]) : [])
    }

    return true
  })
}

function emitChange(sorter?: any) {
  emit(
    'change',
    {
      current: innerPage.value.current,
      pageSize: innerPage.value.pageSize,
      total: innerPage.value.total,
    },
    {},
    sorter,
  )
}

function handlePaginationChange(page: number, pageSize: number) {
  innerPage.value.current = page
  innerPage.value.pageSize = pageSize
  emit('page-change', page, pageSize)
  emitChange()
}

function handleSortChange(params: Record<string, any>) {
  const sorter = {
    ...params,
    order: params.order === 'asc' ? 'ascend' : params.order === 'desc' ? 'descend' : null,
  }

  emit('sort-change', sorter)
  emitChange(sorter)
}

function handleCellClick(params: Record<string, any>) {
  emit('row-click', params.row as T, params.rowIndex as number)
}
</script>

<style scoped lang="less">
.tm-table-container {
  width: 100%;
}

.tm-table-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.tm-table-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}

.tm-table {
  :deep(.vxe-table) {
    border-radius: 8px;
    color: inherit;
  }

  :deep(.vxe-header--column) {
    background-color: #fafafa;
    font-weight: 600;
  }

  :deep(.vxe-body--row:hover) {
    background-color: #f5f5f5;
  }
}

:deep(.dark) .tm-table {
  :deep(.vxe-header--column) {
    background-color: #1f1f1f;
    color: rgba(255, 255, 255, 0.85);
  }

  :deep(.vxe-body--row:hover) {
    background-color: #262626;
  }
}
</style>
