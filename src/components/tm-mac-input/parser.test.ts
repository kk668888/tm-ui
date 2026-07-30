import { describe, expect, it } from 'vitest'
import { parseMacInput } from './parser'

describe('parseMacInput', () => {
  it('normalizes a raw 12-character mac address', () => {
    const result = parseMacInput('00AA11aa2233')

    expect(result.valid).toBe(true)
    expect(result.normalized).toBe('00:AA:11:AA:22:33')
    expect(result.separator).toBe('none')
    expect(result.segments).toEqual(['00', 'AA', '11', 'AA', '22', '33'])
  })

  it('normalizes a dash-separated mac address', () => {
    const result = parseMacInput('00-aa-11-aa-22-33')

    expect(result.valid).toBe(true)
    expect(result.normalized).toBe('00:AA:11:AA:22:33')
    expect(result.separator).toBe('-')
  })

  it('normalizes a colon-separated mac address', () => {
    const result = parseMacInput('00:AA:11:aa:22:33')

    expect(result.valid).toBe(true)
    expect(result.normalized).toBe('00:AA:11:AA:22:33')
    expect(result.separator).toBe(':')
  })

  it('rejects an invalid-length mac address', () => {
    const result = parseMacInput('00AA11')

    expect(result.valid).toBe(false)
    expect(result.error).toContain('length')
  })

  it('rejects non-hex characters', () => {
    const result = parseMacInput('00:AA:11:GG:22:33')

    expect(result.valid).toBe(false)
    expect(result.error).toContain('hex')
  })
})
