import type { TmMacInputParsed, TmMacInputStatus } from './types'

export function parseMacInput(rawInput: string): TmMacInputParsed {
  const raw = rawInput ?? ''
  const trimmed = raw.trim()

  if (!trimmed) {
    return {
      raw,
      normalized: '',
      valid: false,
      separator: 'none',
      segments: [],
    }
  }

  const hasColon = trimmed.includes(':')
  const hasDash = trimmed.includes('-')

  if (hasColon && hasDash) {
    return invalidMacResult(raw, '', hasColon ? ':' : '-', [], 'mixed mac separators are not allowed')
  }

  const separator: TmMacInputParsed['separator'] = hasColon ? ':' : hasDash ? '-' : 'none'
  const compact = trimmed.replace(/[:-]/g, '').toUpperCase()

  if (compact.length !== 12) {
    return invalidMacResult(raw, compact, separator, [], 'invalid mac length')
  }

  if (!/^[0-9A-F]{12}$/.test(compact)) {
    return invalidMacResult(raw, compact, separator, [], 'invalid hex characters in mac address')
  }

  const segments = compact.match(/.{1,2}/g) ?? []
  const normalized = segments.join(':')

  return {
    raw,
    normalized,
    valid: true,
    separator,
    segments,
  }
}

export function getMacInputStatus(parsed: TmMacInputParsed): TmMacInputStatus {
  if (!parsed.raw.trim()) {
    return 'empty'
  }

  return parsed.valid ? 'valid' : 'invalid'
}

function invalidMacResult(
  raw: string,
  normalized: string,
  separator: TmMacInputParsed['separator'],
  segments: string[],
  error: string,
): TmMacInputParsed {
  return {
    raw,
    normalized,
    valid: false,
    separator,
    segments,
    error,
  }
}
