import { cloneVNode, FunctionalComponent } from "vue"

/**
 *  Icon wrapper for icon use in TabBar
 */
export const TabBarIcon: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-tabbar__icon"]
  const children = slots.default?.() || [<></>]

  return cloneVNode(children[0], { class: classNames })
}
