import type { App, Plugin, Component } from 'vue'

export type SFCWithInstall<T> = T & Plugin
type NamedComponent = Component & { name?: string }

/**
 * 为组件添加 install 方法，使其可以通过 app.use() 注册
 */
export function withInstall<T extends Component>(comp: T, alias?: string): SFCWithInstall<T> {
  const component = comp as SFCWithInstall<T>
  component.install = (app: App) => {
    const name = alias || (comp as NamedComponent).name || 'UnnamedComponent'
    app.component(name, comp)
  }
  return component
}
