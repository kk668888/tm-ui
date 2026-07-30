import type { TmIpInputCondition, TmIpInputParsed, TmIpInputStatus } from './types'

const MULTIPLE_SEPARATOR_REGEXP = /[,\uFF0C;\uFF1B\u3001\n]/
const NORMALIZE_MULTIPLE_SEPARATOR_REGEXP = /[\uFF0C\uFF1B\u3001]|\r?\n/g

export function parseIpInput(rawInput: string): TmIpInputParsed {
  const raw = rawInput ?? ''
  const trimmed = raw.trim()

  if (!trimmed) {
    return {
      raw,
      normalized: '',
      mode: 'unknown',
      valid: false,
    }
  }

  if (MULTIPLE_SEPARATOR_REGEXP.test(trimmed)) {
    return parseMultipleIpInput(raw, trimmed)
  }

  return conditionToParsed(raw, parseIpCondition(trimmed))
}

export function getIpInputStatus(parsed: TmIpInputParsed): TmIpInputStatus {
  if (!parsed.raw.trim()) {
    return 'empty'
  }

  return parsed.valid ? 'valid' : 'invalid'
}

function parseMultipleIpInput(raw: string, trimmed: string): TmIpInputParsed {
  const normalizedSeparators = trimmed.replace(NORMALIZE_MULTIPLE_SEPARATOR_REGEXP, ',')

  if (
    normalizedSeparators.startsWith(',')
    || normalizedSeparators.endsWith(',')
    || normalizedSeparators.includes(',,')
  ) {
    return invalidIpResult(raw, normalizedSeparators, 'multiple', 'Invalid separator placement')
  }

  const tokens = normalizedSeparators.split(',').map((item) => item.trim())

  if (tokens.some((item) => !item)) {
    return invalidIpResult(raw, normalizedSeparators, 'multiple', 'Invalid separator placement')
  }

  const conditions: TmIpInputCondition[] = []

  for (const token of tokens) {
    const condition = parseIpCondition(token)

    if (condition.valid === false) {
      return invalidIpResult(raw, normalizedSeparators, 'multiple', condition.error)
    }

    conditions.push(condition.value)
  }

  return {
    raw,
    normalized: conditions.map((item) => item.normalized).join(','),
    mode: 'multiple',
    valid: true,
    items: conditions.map((item) => item.normalized),
    conditions,
  }
}

function conditionToParsed(
  raw: string,
  result: { valid: true, value: TmIpInputCondition } | { valid: false, mode: TmIpInputParsed['mode'], error: string },
): TmIpInputParsed {
  if (result.valid === false) {
    return invalidIpResult(raw, raw.trim(), result.mode, result.error)
  }

  const condition = result.value
  const parsed: TmIpInputParsed = {
    raw,
    normalized: condition.normalized,
    mode: condition.mode,
    valid: true,
    conditions: [condition],
  }

  if (condition.mode === 'single') {
    parsed.items = [condition.value]
  }

  if (condition.mode === 'range') {
    parsed.start = condition.start
    parsed.end = condition.end
  }

  if (condition.mode === 'segment') {
    parsed.segment = condition.segment
  }

  return parsed
}

function parseIpCondition(
  token: string,
): { valid: true, value: TmIpInputCondition } | { valid: false, mode: TmIpInputParsed['mode'], error: string } {
  if (token.includes('-')) {
    return parseRangeIpCondition(token)
  }

  if (token.includes('*')) {
    return parseSegmentIpCondition(token)
  }

  return parseSingleIpCondition(token)
}

function parseSingleIpCondition(
  token: string,
): { valid: true, value: TmIpInputCondition } | { valid: false, mode: 'single', error: string } {
  if (!isValidIpv4(token)) {
    return {
      valid: false,
      mode: 'single',
      error: 'Invalid IPv4 address',
    }
  }

  return {
    valid: true,
    value: {
      mode: 'single',
      raw: token,
      normalized: token,
      value: token,
    },
  }
}

function parseRangeIpCondition(
  token: string,
): { valid: true, value: TmIpInputCondition } | { valid: false, mode: 'range', error: string } {
  if (token.includes('*')) {
    return {
      valid: false,
      mode: 'range',
      error: 'Mixed IP syntax is not allowed in one condition',
    }
  }

  const parts = token.split('-').map((item) => item.trim())

  if (parts.length !== 2 || parts.some((item) => !item)) {
    return {
      valid: false,
      mode: 'range',
      error: 'Invalid range syntax',
    }
  }

  const [start, end] = parts

  if (!isValidIpv4(start) || !isValidIpv4(end)) {
    return {
      valid: false,
      mode: 'range',
      error: 'Invalid IPv4 address in range',
    }
  }

  if (ipv4ToNumber(start) > ipv4ToNumber(end)) {
    return {
      valid: false,
      mode: 'range',
      error: 'Range start must be less than or equal to end',
    }
  }

  return {
    valid: true,
    value: {
      mode: 'range',
      raw: token,
      normalized: `${start}-${end}`,
      start,
      end,
    },
  }
}

function parseSegmentIpCondition(
  token: string,
): { valid: true, value: TmIpInputCondition } | { valid: false, mode: 'segment', error: string } {
  if (token.includes('-')) {
    return {
      valid: false,
      mode: 'segment',
      error: 'Mixed IP syntax is not allowed in one condition',
    }
  }

  const matched = token.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.\*$/)

  if (!matched) {
    return {
      valid: false,
      mode: 'segment',
      error: 'Invalid IP segment syntax',
    }
  }

  const octets = matched.slice(1)
  if (octets.some((item) => !isValidOctet(item))) {
    return {
      valid: false,
      mode: 'segment',
      error: 'Invalid IPv4 segment octet',
    }
  }

  const segment = `${octets.join('.')}.*`

  return {
    valid: true,
    value: {
      mode: 'segment',
      raw: token,
      normalized: segment,
      segment,
    },
  }
}

function invalidIpResult(
  raw: string,
  normalized: string,
  mode: TmIpInputParsed['mode'],
  error: string,
): TmIpInputParsed {
  return {
    raw,
    normalized,
    mode,
    valid: false,
    error,
  }
}

function isValidIpv4(value: string): boolean {
  const parts = value.split('.')

  return parts.length === 4 && parts.every((item) => isValidOctet(item))
}

function isValidOctet(value: string): boolean {
  if (!/^\d{1,3}$/.test(value)) {
    return false
  }

  const number = Number(value)
  return number >= 0 && number <= 255
}

function ipv4ToNumber(value: string): number {
  return value
    .split('.')
    .map((item) => Number(item))
    .reduce((acc, current) => (acc * 256) + current, 0)
}
