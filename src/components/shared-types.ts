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
