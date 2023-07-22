import type { FunctionalComponent } from "vue"

/**
 *  wrapper for navbar
 */
export const NavBar: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-navbar"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
