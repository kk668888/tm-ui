import { describe, expect, it } from 'vitest'
import { parseIpInput } from './parser'

describe('parseIpInput', () => {
  it('parses a single ipv4 address', () => {
    const result = parseIpInput('192.168.0.1')

    expect(result.valid).toBe(true)
    expect(result.mode).toBe('single')
    expect(result.normalized).toBe('192.168.0.1')
  })

  it('parses multiple ip addresses with mixed separators and normalizes to commas', () => {
    const result = parseIpInput(`192.168.0.1\uFF1B127.0.0.1\u300110.0.0.1
172.16.0.1`)

    expect(result.valid).toBe(true)
    expect(result.mode).toBe('multiple')
    expect(result.normalized).toBe('192.168.0.1,127.0.0.1,10.0.0.1,172.16.0.1')
    expect(result.items).toEqual([
      '192.168.0.1',
      '127.0.0.1',
      '10.0.0.1',
      '172.16.0.1',
    ])
  })

  it('parses an ip range', () => {
    const result = parseIpInput('192.168.0.1 - 192.168.0.255')

    expect(result.valid).toBe(true)
    expect(result.mode).toBe('range')
    expect(result.normalized).toBe('192.168.0.1-192.168.0.255')
    expect(result.start).toBe('192.168.0.1')
    expect(result.end).toBe('192.168.0.255')
  })

  it('parses an ip segment with trailing wildcard', () => {
    const result = parseIpInput('192.168.0.*')

    expect(result.valid).toBe(true)
    expect(result.mode).toBe('segment')
    expect(result.normalized).toBe('192.168.0.*')
    expect(result.segment).toBe('192.168.0.*')
  })

  it('rejects a trailing separator in multiple ip mode', () => {
    const result = parseIpInput('192.168.0.1,127.0.0.1,')

    expect(result.valid).toBe(false)
    expect(result.mode).toBe('multiple')
    expect(result.error).toContain('separator')
  })

  it('supports mixed single and range conditions separated by comma', () => {
    const result = parseIpInput('192.168.0.1,192.168.0.2-192.168.0.10')

    expect(result.valid).toBe(true)
    expect(result.mode).toBe('multiple')
    expect(result.items).toEqual(['192.168.0.1', '192.168.0.2-192.168.0.10'])
  })

  it('rejects mixing range dash and segment wildcard in one condition', () => {
    // 同一个条件内同时出现范围符 `-` 和段通配符 `*` 属于语法混用，必须拒绝
    const result = parseIpInput('192.168.0.1-192.168.0.*')

    expect(result.valid).toBe(false)
    expect(result.mode).toBe('range')
    expect(result.error).toContain('Mixed')
  })
})
