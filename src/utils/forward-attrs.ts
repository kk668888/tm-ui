/**
 * Keep inline styles working on wrapper components while reserving class merging
 * for each wrapper's own root class strategy.
 */
import { computed, useAttrs } from 'vue'

export function useForwardAttrs() {
  const attrs = useAttrs()
  return computed(() => {
    const { class: _cls, ...rest } = attrs
    return rest
  })
}
