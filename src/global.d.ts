import 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $tmMessage: typeof import('./components/tm-message').TmMessage
    $tmNotification: typeof import('./components/tm-notification').TmNotification
  }
}

export {}
