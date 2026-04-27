import { computed, useSlots } from 'vue'

export function useForwardSlots(exclude: string[] = []) {
  const slots = useSlots()

  return computed(() =>
    Object.fromEntries(
      Object.entries(slots).filter(([name]) => !exclude.includes(name)),
    ),
  )
}
