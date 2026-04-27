import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    hidden?: boolean
    public?: boolean
    keepAlive?: boolean
    affix?: boolean
    permission?: string | string[]
    activeMenu?: string
  }
}
