import type { FunctionalComponent } from "vue"

export interface TabBodyItemProps {
  /**
   * display this component
   */
  active: boolean
}

/**
 * Content wrapper for each Tab Item
 */
export const TabBodyItem: FunctionalComponent<TabBodyItemProps> = (
  props,
  { slots }
) => {
  const { active } = props
  const classNames = ["weui-tab__bd-item"]
  const children = slots.default?.()
  return (
    <div class={classNames} style={{ display: active ? "block" : "none" }}>
      {children}
    </div>
  )
}
