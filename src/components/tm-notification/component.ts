import type { App, Plugin } from 'vue'
import { notification } from 'ant-design-vue'

type TmNotificationApi = typeof notification & Plugin

const DEFAULT_DURATION = 4.5
const DEFAULT_PLACEMENT = 'topRight'

type NotificationArgs = Parameters<typeof notification.open>[0]

function appendClass(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base
}

function withDefaultArgs(args: NotificationArgs): NotificationArgs {
  return {
    placement: DEFAULT_PLACEMENT,
    duration: DEFAULT_DURATION,
    ...args,
    class: appendClass('tm-notification', args.class),
  }
}

export const TmNotification = Object.assign({}, notification, {
  success(args: NotificationArgs) {
    notification.success(withDefaultArgs(args))
  },
  error(args: NotificationArgs) {
    notification.error(withDefaultArgs(args))
  },
  info(args: NotificationArgs) {
    notification.info(withDefaultArgs(args))
  },
  warning(args: NotificationArgs) {
    notification.warning(withDefaultArgs(args))
  },
  warn(args: NotificationArgs) {
    notification.warn(withDefaultArgs(args))
  },
  open(args: NotificationArgs) {
    notification.open(withDefaultArgs(args))
  },
  config(options: Parameters<typeof notification.config>[0]) {
    notification.config({
      placement: DEFAULT_PLACEMENT,
      duration: DEFAULT_DURATION,
      ...options,
    })
  },
}) as TmNotificationApi

TmNotification.install = (app: App) => {
  app.config.globalProperties.$tmNotification = TmNotification
  app.provide('tm-notification', TmNotification)
}

export default TmNotification
