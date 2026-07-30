export type TmMacInputStatus = 'empty' | 'valid' | 'invalid'

export interface TmMacInputParsed {
  raw: string
  normalized: string
  valid: boolean
  separator: ':' | '-' | 'none'
  segments: string[]
  error?: string
}

export interface TmMacInputProps {
  modelValue?: string
  placeholder?: string
  allowClear?: boolean
  normalizeOnBlur?: boolean
  showInvalidStatus?: boolean
  showInvalidFeedback?: boolean
  invalidFeedback?: string
}
