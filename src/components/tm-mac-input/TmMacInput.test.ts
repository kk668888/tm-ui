import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { TmMacInput } from './component'

describe('TmMacInput', () => {
  it('forwards class to the rendered input', () => {
    const wrapper = mount(TmMacInput, {
      attrs: {
        class: 'custom-mac-input',
      },
    })

    expect(wrapper.find('.custom-mac-input').exists()).toBe(true)
  })

  it('normalizes mac input to uppercase colon format on blur and emits validation state', async () => {
    const wrapper = mount(TmMacInput)
    const input = wrapper.find('input')

    await input.setValue('00-aa-11-aa-22-33')
    await input.trigger('blur')

    const modelEvents = wrapper.emitted('update:modelValue') ?? []
    const parsedEvents = wrapper.emitted('update:parsed') ?? []
    const statusEvents = wrapper.emitted('update:status') ?? []
    const validEvents = wrapper.emitted('update:valid') ?? []

    expect(modelEvents[modelEvents.length - 1]?.[0]).toBe('00:AA:11:AA:22:33')
    expect(parsedEvents[parsedEvents.length - 1]?.[0]).toMatchObject({
      valid: true,
      normalized: '00:AA:11:AA:22:33',
      separator: '-',
    })
    expect(statusEvents[statusEvents.length - 1]?.[0]).toBe('valid')
    expect(validEvents[validEvents.length - 1]?.[0]).toBe(true)
  })

  it('shows error state and default feedback for malformed mac', async () => {
    const wrapper = mount(TmMacInput)

    await wrapper.find('input').setValue('00:AA:11:GG:22:33')

    const statusEvents = wrapper.emitted('update:status') ?? []
    const validEvents = wrapper.emitted('update:valid') ?? []

    expect(statusEvents[statusEvents.length - 1]).toEqual(['invalid'])
    expect(validEvents[validEvents.length - 1]).toEqual([false])
    expect(wrapper.find('[aria-invalid="true"]').exists()).toBe(true)
    expect(wrapper.find('.tm-mac-input-wrapper-error').exists()).toBe(true)
    expect(wrapper.find('.tm-mac-input-error-message').text()).toBe('MAC格式错误，请重新输入')
  })

  it('supports custom invalid feedback', async () => {
    const wrapper = mount(TmMacInput, {
      props: {
        invalidFeedback: '请输入合法的 MAC 地址',
      },
    })

    await wrapper.find('input').setValue('00:AA:11:GG:22:33')

    expect(wrapper.find('.tm-mac-input-error-message').text()).toBe('请输入合法的 MAC 地址')
  })
})
