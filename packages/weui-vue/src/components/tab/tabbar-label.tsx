import type { FunctionalComponent } from "vue"

/**
 *  label wrapper for text inside TabBarItem
 */
export const TabBarLabel: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-tabbar__label"]
  const children = slots.default?.()
  return <p class={classNames}>{children}</p>
}
