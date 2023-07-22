import type { FunctionalComponent } from "vue"
import { TabBarItem } from "./tabbar-item"

/**
 *  Bottom bar for tabs
 */
const TabBar: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-tabbar"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
// TabBar.name = "weui-tabbar"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TabBar.Item = TabBarItem

export { TabBar }
