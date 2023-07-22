import type { FunctionalComponent } from "vue"

export interface NavBarItemProps {
  /**
   * indicate tab is active
   */
  active: boolean
  /**
   * label of the item
   */
  label: string
}

/**
 *  Navbar item to display info
 */
export const NavBarItem: FunctionalComponent<NavBarItemProps> = (
  props,
  { slots }
) => {
  const { active, label } = props
  const classNames = ["weui-navbar__item", { "weui-bar__item_on": active }]
  const children = slots.default?.()
  return <div class={classNames}>{label ? label : children}</div>
}
