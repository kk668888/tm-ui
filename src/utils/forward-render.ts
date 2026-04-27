import type { Component, PropType, Slots } from 'vue'
import { defineComponent, h } from 'vue'

export const ForwardRender = defineComponent({
  name: 'ForwardRender',
  props: {
    is: {
      type: [Object, Function, String] as PropType<Component>,
      required: true,
    },
    attrs: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
    slots: {
      type: Object as PropType<Slots>,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => h(props.is, props.attrs, props.slots)
  },
})
