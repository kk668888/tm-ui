import { describe, expect, it, vi } from 'vitest'
import { defineComponent, type App } from 'vue'
import { withInstall } from './with-install'

describe('withInstall', () => {
  it('registers a component by its name', () => {
    const component = defineComponent({ name: 'TmUnitComponent' })
    const installed = withInstall(component)
    const app = { component: vi.fn() } as unknown as App

    installed.install?.(app)

    expect(app.component).toHaveBeenCalledWith('TmUnitComponent', component)
  })

  it('uses alias when provided', () => {
    const component = defineComponent({ name: 'OriginalName' })
    const installed = withInstall(component, 'AliasName')
    const app = { component: vi.fn() } as unknown as App

    installed.install?.(app)

    expect(app.component).toHaveBeenCalledWith('AliasName', component)
  })
})
