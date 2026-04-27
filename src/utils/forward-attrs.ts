/**
 * Strip class and style from attrs so parent can apply its own wrapper classes.
 */
import { computed, useAttrs } from 'vue'

export function useForwardAttrs() {
  const attrs = useAttrs()
  return computed(() => {
    const { class: _cls, style, ...rest } = attrs
    return rest
  })
}
