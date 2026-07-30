export type TmValue = string | number | boolean

export interface TmOption<Value = TmValue> {
  label: string
  value: Value
  disabled?: boolean
  children?: TmOption<Value>[]
}

export interface TmTreeOption<Value = TmValue> {
  label?: string
  title?: string
  value: Value
  key?: string | number
  disabled?: boolean
  children?: TmTreeOption<Value>[]
}

/**
 * 带有 checked 目标的受控事件形状
 * 适配 ant-design-vue 的 Checkbox / Radio / Switch 的 change 事件入参
 */
export interface TmCheckedEvent {
  target?: { checked?: boolean }
}

/**
 * 表格排序状态
 * order 为 null 表示取消排序；ascend/descend 与 ant-design-vue 语义对齐
 */
export interface TmSorterState {
  field?: string
  order: 'ascend' | 'descend' | null
  column?: unknown
  columnKey?: string
  [key: string]: unknown
}

