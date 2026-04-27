import type { PropType, Slot } from 'vue'
import { defineComponent } from 'vue'

export const RenderSlot = defineComponent({
  name: 'RenderSlot',
  props: {
    slot: {
      type: Function as PropType<Slot | undefined>,
      default: undefined,
    },
    slotProps: {
      type: Object as PropType<Record<string, unknown> | undefined>,
      default: undefined,
    },
  },
  setup(props) {
    return () => props.slot?.(props.slotProps)
  },
})
