import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { TmIpInput } from './component'
import type { TmIpInputParsed } from './types'

describe('TmIpInput', () => {
  it('forwards class to the rendered input', () => {
    const wrapper = mount(TmIpInput, {
      attrs: {
        class: 'custom-ip-input',
      },
    })

    expect(wrapper.find('.custom-ip-input').exists()).toBe(true)
  })

  it('normalizes multiple ip separators on blur and emits parse state', async () => {
    const wrapper = mount(TmIpInput)
    const input = wrapper.find('input')

    await input.setValue('192.168.0.1\uFF1B127.0.0.1\u300110.0.0.1')
    await input.trigger('blur')

    const modelEvents = wrapper.emitted('update:modelValue') ?? []
    const parsedEvents = wrapper.emitted('update:parsed') ?? []
    const statusEvents = wrapper.emitted('update:status') ?? []
    const validEvents = wrapper.emitted('update:valid') ?? []

    expect(modelEvents[modelEvents.length - 1]?.[0]).toBe('192.168.0.1,127.0.0.1,10.0.0.1')
    expect(parsedEvents[parsedEvents.length - 1]?.[0]).toMatchObject({
      valid: true,
      mode: 'multiple',
      normalized: '192.168.0.1,127.0.0.1,10.0.0.1',
    })
    expect(statusEvents[statusEvents.length - 1]?.[0]).toBe('valid')
    expect(validEvents[validEvents.length - 1]?.[0]).toBe(true)
  })

  it('supports mixed ip conditions in one input', async () => {
    const wrapper = mount(TmIpInput)
    const input = wrapper.find('input')

    await input.setValue('192.168.0.1,192.168.0.10-192.168.0.20,10.0.0.*')
    await input.trigger('blur')

    const modelEvents = wrapper.emitted('update:modelValue') ?? []
    const parsedEvents = wrapper.emitted('update:parsed') ?? []
    const parsed = parsedEvents[parsedEvents.length - 1]?.[0] as TmIpInputParsed

    expect(modelEvents[modelEvents.length - 1]?.[0]).toBe('192.168.0.1,192.168.0.10-192.168.0.20,10.0.0.*')
    expect(parsed).toMatchObject({
      valid: true,
      mode: 'multiple',
      normalized: '192.168.0.1,192.168.0.10-192.168.0.20,10.0.0.*',
      items: ['192.168.0.1', '192.168.0.10-192.168.0.20', '10.0.0.*'],
    })
    expect(parsed?.conditions).toEqual([
      {
        mode: 'single',
        raw: '192.168.0.1',
        normalized: '192.168.0.1',
        value: '192.168.0.1',
      },
      {
        mode: 'range',
        raw: '192.168.0.10-192.168.0.20',
        normalized: '192.168.0.10-192.168.0.20',
        start: '192.168.0.10',
        end: '192.168.0.20',
      },
      {
        mode: 'segment',
        raw: '10.0.0.*',
        normalized: '10.0.0.*',
        segment: '10.0.0.*',
      },
    ])
  })

  it('normalizes mixed condition separators on blur', async () => {
    const wrapper = mount(TmIpInput)
    const input = wrapper.find('input')

    await input.setValue('192.168.0.1\uFF1B192.168.0.10-192.168.0.20\u300110.0.0.*\n127.0.0.1')
    await input.trigger('blur')

    const modelEvents = wrapper.emitted('update:modelValue') ?? []
    const parsedEvents = wrapper.emitted('update:parsed') ?? []

    expect(modelEvents[modelEvents.length - 1]?.[0]).toBe('192.168.0.1,192.168.0.10-192.168.0.20,10.0.0.*,127.0.0.1')
    expect(parsedEvents[parsedEvents.length - 1]?.[0]).toMatchObject({
      valid: true,
      mode: 'multiple',
      normalized: '192.168.0.1,192.168.0.10-192.168.0.20,10.0.0.*,127.0.0.1',
    })
  })

  it('marks mixed input as invalid when any condition is malformed', async () => {
    const wrapper = mount(TmIpInput)
    const input = wrapper.find('input')

    await input.setValue('192.168.0.1,192.168.0.30-192.168.0.20,10.0.0.*')

    expect(wrapper.find('[aria-invalid="true"]').exists()).toBe(true)
    expect(wrapper.find('.tm-ip-input-wrapper-error').exists()).toBe(true)
    const statusEvents = wrapper.emitted('update:status') ?? []
    const validEvents = wrapper.emitted('update:valid') ?? []

    expect(statusEvents[statusEvents.length - 1]?.[0]).toBe('invalid')
    expect(validEvents[validEvents.length - 1]?.[0]).toBe(false)
  })

  it('marks the input as invalid when ip validation fails', async () => {
    const wrapper = mount(TmIpInput)
    const input = wrapper.find('input')

    await input.setValue('999.168.0.1')

    expect(wrapper.find('[aria-invalid="true"]').exists()).toBe(true)
    expect(wrapper.find('.tm-ip-input-wrapper-error').exists()).toBe(true)
    expect(wrapper.find('.tm-ip-input-error-message').exists()).toBe(true)
    expect(wrapper.find('.tm-ip-input-error-message').text()).toBe('IP格式错误，请重新输入')
    const statusEvents = wrapper.emitted('update:status') ?? []
    const validEvents = wrapper.emitted('update:valid') ?? []

    expect(statusEvents[statusEvents.length - 1]?.[0]).toBe('invalid')
    expect(validEvents[validEvents.length - 1]?.[0]).toBe(false)
  })

  it('supports custom invalid feedback text', async () => {
    const wrapper = mount(TmIpInput, {
      props: {
        invalidFeedback: '请输入合法的 IP 地址',
      },
    })
    const input = wrapper.find('input')

    await input.setValue('999.168.0.1')

    expect(wrapper.find('.tm-ip-input-error-message').text()).toBe('请输入合法的 IP 地址')
  })
})
