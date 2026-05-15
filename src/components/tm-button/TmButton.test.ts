import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { TmButton } from './component'

describe('TmButton', () => {
  it('forwards class and default slot to ant-design-vue button', () => {
    const wrapper = mount(TmButton, {
      attrs: {
        class: 'custom-button',
      },
      slots: {
        default: 'Submit',
      },
    })

    expect(wrapper.text()).toContain('Submit')
    expect(wrapper.find('button').classes()).toContain('tm-btn')
    expect(wrapper.find('button').classes()).toContain('custom-button')
  })
})
