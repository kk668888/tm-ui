/**
 * Forward all slots from a parent component to a child, with optional exclusion list.
 * Returns a render helper object for use in template v-for loops.
 */
import { useSlots } from 'vue'

export function useForwardSlots(exclude: string[] = []) {
  const slots = useSlots()
  return Object.keys(slots).filter((name) => !exclude.includes(name))
}
