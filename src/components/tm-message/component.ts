import type { App, Plugin } from 'vue'
import { message } from 'ant-design-vue'

type TmMessageApi = typeof message & Plugin

const DEFAULT_DURATION = 3

type MessageArgs = Parameters<typeof message.open>[0]
type MessageContent = Parameters<typeof message.info>[0]
type MessageDuration = Parameters<typeof message.info>[1]
type MessageOnClose = Parameters<typeof message.info>[2]

function appendClass(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base
}

function withDefaultArgs(args: MessageArgs): MessageArgs {
  return {
    duration: DEFAULT_DURATION,
    ...args,
    class: appendClass('tm-message', args.class),
  }
}

export const TmMessage = Object.assign({}, message, {
  info(content: MessageContent, duration: MessageDuration = DEFAULT_DURATION, onClose?: MessageOnClose) {
    return message.info(content, duration, onClose)
  },
  success(content: MessageContent, duration: MessageDuration = DEFAULT_DURATION, onClose?: MessageOnClose) {
    return message.success(content, duration, onClose)
  },
  error(content: MessageContent, duration: MessageDuration = DEFAULT_DURATION, onClose?: MessageOnClose) {
    return message.error(content, duration, onClose)
  },
  warning(content: MessageContent, duration: MessageDuration = DEFAULT_DURATION, onClose?: MessageOnClose) {
    return message.warning(content, duration, onClose)
  },
  loading(content: MessageContent, duration: MessageDuration = DEFAULT_DURATION, onClose?: MessageOnClose) {
    return message.loading(content, duration, onClose)
  },
  warn(content: MessageContent, duration: MessageDuration = DEFAULT_DURATION, onClose?: MessageOnClose) {
    return message.warn(content, duration, onClose)
  },
  open(args: MessageArgs) {
    return message.open(withDefaultArgs(args))
  },
  config(options: Parameters<typeof message.config>[0]) {
    message.config({ duration: DEFAULT_DURATION, ...options })
  },
}) as TmMessageApi

TmMessage.install = (app: App) => {
  app.config.globalProperties.$tmMessage = TmMessage
  app.provide('tm-message', TmMessage)
}

export default TmMessage
