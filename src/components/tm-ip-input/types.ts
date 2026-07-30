export type TmIpInputMode = 'single' | 'multiple' | 'range' | 'segment' | 'unknown'

export type TmIpInputStatus = 'empty' | 'valid' | 'invalid'

export type TmIpInputConditionMode = 'single' | 'range' | 'segment'

export type TmIpInputCondition =
  | {
    mode: 'single'
    raw: string
    normalized: string
    value: string
  }
  | {
    mode: 'range'
    raw: string
    normalized: string
    start: string
    end: string
  }
  | {
    mode: 'segment'
    raw: string
    normalized: string
    segment: string
  }

export interface TmIpInputParsed {
  raw: string
  normalized: string
  mode: TmIpInputMode
  valid: boolean
  items?: string[]
  conditions?: TmIpInputCondition[]
  start?: string
  end?: string
  segment?: string
  error?: string
}

export interface TmIpInputProps {
  modelValue?: string
  placeholder?: string
  allowClear?: boolean
  normalizeOnBlur?: boolean
  showInvalidStatus?: boolean
  showInvalidFeedback?: boolean
  invalidFeedback?: string
}
