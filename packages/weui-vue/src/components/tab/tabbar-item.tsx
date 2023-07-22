import type { FunctionalComponent, VNodeChild } from "vue"
import { TabBarIcon } from "./tabbar-icon"
import { TabBarLabel } from "./tabbar-label"

export interface TabBarItemProps {
  /**
   * indicate currently active
   */
  active?: boolean
  /**
   * icon of item
   */
  icon?: VNodeChild
  /**
   * label of item
   */
  label?: string
}

/**
 *  Tabbar item
 */
export const TabBarItem: FunctionalComponent<TabBarItemProps> = (
  props,
  { slots }
) => {
  const { active, icon, label } = props
  const classNames = ["weui-tabbar__item", { "weui-bar__item_on": active }]

  const children =
    icon || label ? (
      <>
        {icon && <TabBarIcon>{icon}</TabBarIcon>}
        {label && <TabBarLabel>{label}</TabBarLabel>}
      </>
    ) : (
      slots.default?.()
    )

  return <div class={classNames}>{children}</div>
}
