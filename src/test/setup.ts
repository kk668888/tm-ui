import { afterEach, vi } from 'vitest'

afterEach(() => {
  document.body.innerHTML = ''
})

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)
