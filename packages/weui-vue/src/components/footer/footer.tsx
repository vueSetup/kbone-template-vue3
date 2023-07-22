import type { FunctionalComponent } from "vue"

/**
 * consists of `footer_links`, `footer_link` and `footer_text`
 */
export const Footer: FunctionalComponent = (props, { slots }) => {
  const classNames = ["weui-footer"]
  const children = slots.default?.()
  return <div class={classNames}>{children}</div>
}
